import { data, getData, saveTech } from "../data/api";
import { Category, Tech, Tag, User, Rating } from "../data/interfaces";
import { uniqBy, flatten, sortBy } from "@microsoft/sp-lodash-subset";
import slugify from "slugify";
import { updateRatingsString, parseRatingsString, calcRatingsAvg } from "../data/dataUtils";

let waitForData = getData();

const resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      await waitForData;
      console.log("resolvers Query.categories", data.technologies);
      return data.categories;
    },
    technologies: async (root, args, context, info) => {
      await waitForData;
      console.log("resolvers Query.technologies", data.technologies);

      return data.technologies;
    },
    users: async (root, args, context, info) => {
      await waitForData;
      return data.users;
    },
    tags: async (root, args, context, info) => {
      await waitForData;
      return sortBy(uniqBy(flatten(data.technologies.map((t) => t.tags)), "title"), "title");
    },
    tech: async (root, { id }) => {
      await waitForData;
      return data.technologies.find((t) => t.Id === id);
    },
    currentUser: () => {
      return data.users.find((u) => u.email === window.__portalsDev.currentUser.email);
    },
  },
  Category: {
    technologies: async (category: Category) => {
      await waitForData;
      return data.technologies.filter((t) => t.CategoryId === category.Id);
    },
    slug: (category: Category) => {
      return slugify(category.Title).toLowerCase();
    },
  },
  Tech: {
    category: async (tech: Tech) => {
      await waitForData;
      return data.categories.find((c) => c.Id === tech.CategoryId);
    },
    sortOrder: async (tech: Tech) => {
      await waitForData;
      let category = data.categories.find((c) => c.Id === tech.CategoryId);
      return category ? category.Position : 99;
    },
    createdBy: async (tech: Tech) => {
      await waitForData;
      return data.users.find((user) => user.id === tech.AuthorId);
    },
    modifiedBy: async (tech: Tech) => {
      await waitForData;
      return data.users.find((user) => user.id === tech.EditorId);
    },
    slug: async (tech: Tech) => {
      return slugify(tech.Title).toLowerCase();
    },
    Logo: (tech: Tech) => {
      // This resolver wouldn't fire if this were ever true right?
      if (tech.Logo) {
        return tech.Logo;
      }
      let category = data.categories.find((c) => c.Id === tech.CategoryId);
      return category.Icon;
    },
    ratings: (tech: Tech) => {
      return parseRatingsString(tech.Ratings);
    },
    currentUserRating: (tech: Tech) => {
      let ratings = parseRatingsString(tech.Ratings);
      let currentUser = data.users.find((u) => u.email === window.__portalsDev.currentUser.email);
      let rating = ratings.find((r) => r.userId === currentUser.id);
      return rating ? rating.value : null;
    },
    averageRating: (tech: Tech) => {
      return calcRatingsAvg(tech.Ratings);
    },
  },
  Rating: {
    user: (rating: Rating) => {
      return data.users.find((u) => u.id === rating.userId);
    },
  },
  Tag: {
    technologies: async (tag: Tag) => {
      await waitForData;
      return data.technologies.filter((tech) => !!tech.tags.find((t) => t.title === tag.title));
    },
  },
  Mutation: {
    saveTech: async (parent, { tech }) => {
      let newTech = await saveTech(tech);
      return newTech;
    },
    rateTech: async (parent, { rating: { techId, value } }) => {
      let tech = data.technologies.find((t) => t.Id === techId);
      let currentUser = data.users.find((u) => u.email === window.__portalsDev.currentUser.email);
      if (tech) {
        tech.Ratings = updateRatingsString(tech.Ratings, { value, userId: currentUser.id });
        await saveTech({ Id: tech.Id, Ratings: tech.Ratings } as any);
      }
      return tech;
    },
  },
};

export default resolvers;

import { getData, saveTech } from "../data/api";
import { AppData, Category, Tech, Tag } from "../data/interfaces";
import { uniqBy, flatten, sortBy } from "@microsoft/sp-lodash-subset";
import slugify from "slugify";

let data: AppData;
let waitForData = getData().then((result) => (data = result));

const resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      await waitForData;
      return data.categories;
    },
    technologies: async (root, args, context, info) => {
      await waitForData;
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
  },
};

export default resolvers;

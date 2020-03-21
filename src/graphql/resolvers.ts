import { getData } from "../data/api";
import { AppData, Category, Tech } from "../data/interfaces";

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
  },
  Category: {
    technologies: async (category: Category) => {
      await waitForData;
      return data.technologies.filter((t) => t.categoryIds.indexOf(category.Id) > -1);
    },
  },
  Tech: {
    categories: async (tech: Tech) => {
      await waitForData;
      return data.categories.filter((c) => tech.categoryIds.indexOf(c.Id) > -1);
    },
    sortOrder: async (tech: Tech) => {
      await waitForData;
      return Math.min(
        ...data.categories.filter((c) => tech.categoryIds.indexOf(c.Id) > -1).map((c) => c.Position)
      );
    },
    createdBy: async (tech: Tech) => {
      await waitForData;
      return data.users.find((user) => user.id === tech.AuthorId);
    },
    modifiedBy: async (tech: Tech) => {
      await waitForData;
      return data.users.find((user) => user.id === tech.EditorId);
    },
  },
};

export default resolvers;

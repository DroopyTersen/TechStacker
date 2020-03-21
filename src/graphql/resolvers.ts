import { getData } from "../data/api";
import { AppData } from "../data/interfaces";

let data: AppData;
let waitForData = getData().then((result) => (data = result));

const resolvers = {
  Query: {
    categories: async (root, args, context, info) => {
      await waitForData;
      return data.categories;
    },
  },
};

export default resolvers;

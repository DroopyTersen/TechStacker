import SPScript from "spscript";
import Context from "spscript/lib/context/Context";
import { Category, Tech, AppData } from "./interfaces";
import { parseTagsString, transformTechItem } from "./dataUtils";
export let data: AppData = null;
export let getData = async function() {
  let ctx = SPScript.createContext();
  let [categories, technologies, users] = await Promise.all([
    getCategories(ctx),
    getTech(ctx),
    getUsers(ctx),
  ]);
  data = { categories, technologies, users };
};

let getCategories = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $orderby: "Position,Title",
    $select: "Title,Id,Position,Description,Icon",
  };
  let items: Category[] = await ctx
    .lists("TechCategories")
    .getItems(SPScript.utils.qs.fromObj(odata));

  return items;
};

export let saveTech = async function(tech: Tech) {
  let ctx = SPScript.createContext();
  let list = ctx.lists("Tech");
  let item;
  if (!tech.Id) {
    item = await list.addItem(tech);
  } else {
    await list.updateItem(tech.Id, tech);
    item = await list.getItemById(tech.Id);
  }
  data.technologies = await getTech(ctx);
  return transformTechItem(item);
};

let getTech = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $select:
      "Title,Link,Logo,Id,CategoryId,Description,Ratings,Tagline,Tags,Created,Modified,EditorId,AuthorId",
    $orderby: "Title",
  };
  let items: any[] = await ctx.lists("Tech").getItems(SPScript.utils.qs.fromObj(odata));

  items = items.map(transformTechItem);

  return items as Tech[];
};

let getUsers = async function(ctx: Context) {
  let items = await ctx.get("/web/siteUsers?$top=5000").then(SPScript.utils.parseOData);

  let users = items
    .filter((item) => item.Email)
    .map((item) => {
      return {
        id: item.Id,
        name: item.Title,
        email: item.Email,
      };
    });
  return users;
};

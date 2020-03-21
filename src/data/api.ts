import SPScript from "spscript";
import Context from "spscript/lib/context/Context";
import { Category, Tech, AppData } from "./interfaces";
import { parseTagsString, transformTechItem } from "./dataUtils";

export let getData = async function() {
  let ctx = SPScript.createContext();
  let [categories, technologies, users] = await Promise.all([
    getCategories(ctx),
    getTech(ctx),
    getUsers(ctx),
  ]);
  return { categories, technologies, users } as AppData;
};

let getCategories = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $orderby: "Position,Title",
    $select: "Title,Id,Position,Description",
  };
  let items: Category[] = await ctx
    .lists("TechCategories")
    .getItems(SPScript.utils.qs.fromObj(odata));

  return items;
};

export let saveTech = async function(tech: Tech) {
  let list = SPScript.createContext().lists("Tech");
  let item;
  if (!tech.Id) {
    item = await list.addItem(tech);
  } else {
    await list.updateItem(tech.Id, tech);
    item = await list.getItemById(tech.Id);
  }

  return transformTechItem(item);
};

let getTech = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $select: "Title,Link,Logo,Id,CategoryId,Description,Tags,Created,Modified,EditorId,AuthorId",
    $orderby: "Title",
  };
  let items: any[] = await ctx.lists("Tech").getItems(SPScript.utils.qs.fromObj(odata));

  items = items.map(transformTechItem);

  return items as Tech[];
};

let getUsers = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $select: "Title,EMail,Picture,Department,JobTitle,Office,Id",
  };

  let items: any[] = await ctx
    .lists("User Information List")
    .getItems(SPScript.utils.qs.fromObj(odata));

  let users = items
    .filter((item) => item.EMail)
    .map((item) => {
      return {
        id: item.Id,
        name: item.Title,
        email: item.EMail,
        photo: item.Picture && item.Picture.Url ? item.Picture.Url : "",
        department: item.Department,
        jobTitle: item.JobTitle,
        office: item.Office,
      };
    });
  return users;
};

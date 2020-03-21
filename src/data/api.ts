import SPScript from "spscript";
import Context from "spscript/lib/context/Context";
import { Category, Tech, AppData } from "./interfaces";

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

let getTech = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $select: "Title,Link,Logo,Id,CategoriesId,Created,Modified,EditorId,AuthorId",
    $orderby: "Title",
  };
  let items: any[] = await ctx.lists("Tech").getItems(SPScript.utils.qs.fromObj(odata));
  items = items.map((item) => {
    item.categoryIds =
      item.CategoriesId && item.CategoriesId.results ? item.CategoriesId.results : [];
    return item;
  });

  return items;
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

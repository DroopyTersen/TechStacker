import SPScript from "spscript";
import Context from "spscript/lib/context/Context";
import { Category } from "./interfaces";

export let getData = async function() {
  let ctx = SPScript.createContext();
  let categories = await getCategories(ctx);
  return { categories };
};

let getCategories = async function(ctx: Context) {
  let odata = {
    $top: 5000,
    $orderby: "Position,Title",
    $select: "Title,Id,Position,Description",
  };
  let categories: Category[] = await ctx
    .lists("TechCategories")
    .getItems(SPScript.utils.qs.fromObj(odata));

  return categories;
};

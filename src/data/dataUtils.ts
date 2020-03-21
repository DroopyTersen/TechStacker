import { Tag, Tech } from "./interfaces";

export const parseTagsString = (str): Tag[] => {
  return str
    .split(",")
    .map((tag) =>
      tag
        .trim()
        .toLowerCase()
        .replace(" ", "-")
    )
    .filter(Boolean)
    .map((t) => ({ title: t, technologies: [] }));
};

export const transformTechItem = (item): Tech => {
  item.tags = parseTagsString(item.Tags || "");
  return item;
};

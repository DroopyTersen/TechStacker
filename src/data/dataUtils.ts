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

export const filterTech = (technologies: Tech[], filter = "") => {
  if (!filter) return technologies;
  filter = filter.toLowerCase();
  return technologies.filter((tech) => {
    return (
      tech.Title.toLowerCase().includes(filter) ||
      tech.category.Title.toLowerCase().includes(filter) ||
      tech.tags
        .map((t) => t.title)
        .join(" ")
        .toLowerCase()
        .includes(filter)
    );
  });
};

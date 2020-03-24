import { Tag, Tech, Rating } from "./interfaces";

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

export const updateRatingsString = (ratingsStr: string, { value, userId }) => {
  try {
    let ratings: Rating[] = parseRatingsString(ratingsStr);
    return JSON.stringify([...ratings.filter((r) => r.userId !== userId), { value, userId }]);
  } catch (err) {
    console.log("Unable to add rating to JSON string", err);
    return ratingsStr;
  }
};

export const parseRatingsString = (ratingsStr: string): Rating[] => {
  if (!ratingsStr) return [];
  try {
    let ratings = JSON.parse(ratingsStr);
    return ratings || [];
  } catch (err) {
    return [];
  }
};

export const calcRatingsAvg = (ratingsStr: string): number => {
  let ratings: Rating[] = parseRatingsString(ratingsStr);
  if (ratings.length < 1) return 0;
  let scores = ratings.map((r) => r.value).filter((value) => value > 0);
  let total = scores.reduce((sum, score) => sum + score, 0);
  return Math.round((total / scores.length) * 10) / 10;
};

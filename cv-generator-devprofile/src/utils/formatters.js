/*
 Parses a comma-separated string of technologies into a cleaned, unique array of tags.
 Ensures white spaces are stripped and empty entries are safely dropped.
*/

export const splitTags = (text) => {
  if (!text) return [];
  return text
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
};
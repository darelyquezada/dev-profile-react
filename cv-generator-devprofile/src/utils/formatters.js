/*
 Parses a comma-separated string of technologies into a cleaned, unique array of tags.
 Ensures white spaces are stripped and empty entries are safely dropped.
*/
export function parseTechnologies(techString) {
  if (!techString) return []; // Handles null, undefined, or empty string cases 
  return techString
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}
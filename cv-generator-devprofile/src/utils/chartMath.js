import { LEVEL_VALUES, CATEGORY_COLORS } from './constants';

/* Cleans and sorts technical skills based on their proficiency weight */
export const getSortedSkills = (skills, limit = 12) => {
  return [...skills]
    .sort((a, b) => (LEVEL_VALUES[b.level] ?? 50) - (LEVEL_VALUES[a.level] ?? 50))
    .slice(0, limit);
};

/* Builds SVG path strings for the donut slices using trigonometry */
export const calculateDonutSlices = (skills) => {
  const categoryCount = skills.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(categoryCount); // Converts the category count object into an array of [category, count] pairs
  const total = skills.length; // Total number of skills to calculate proportions
  const cx = 80, cy = 80, r = 60, inner = 35; // Defines the center and radii for the donut chart
  let cumAngle = -Math.PI / 2; // Initializes cumulative angle to start from the top (12 o'clock position)

  const pieColors = Object.values(CATEGORY_COLORS);

  return entries.map(([cat, count], i) => {
    const angle = (count / total) * 2 * Math.PI;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    
    // Calculates the outer arc points for the slice
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    
    // Calculates the inner arc points for the donut hole
    const ix1 = cx + inner * Math.cos(startAngle);
    const iy1 = cy + inner * Math.sin(startAngle);
    const ix2 = cx + inner * Math.cos(endAngle);
    const iy2 = cy + inner * Math.sin(endAngle);

    // Determines if the slice is larger than 180 degrees for proper SVG arc drawing
    const large = angle > Math.PI ? 1 : 0;
    const d = `M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`;

    return { cat, count, d, color: CATEGORY_COLORS[cat] ?? pieColors[i % pieColors.length] };
  });
};

/* Resolves polar coordinate projections for custom SVG radar chart vectors */
export const getRadarCoordinates = (index, value, totalElements, cx = 110, cy = 110, maxR = 85) => {
  const angle = (index * 2 * Math.PI) / totalElements - Math.PI / 2; // Starts from top (12 o'clock)
  const r = (value / 100) * maxR; // Scales the value to the maximum radius
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]; // Converts polar to Cartesian coordinates
};
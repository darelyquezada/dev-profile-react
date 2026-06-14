import { useCV, CVContext } from '../context/CVContext';
import { LEVEL_VALUES, CATEGORY_COLORS } from '../utils/constants';
import { getSortedSkills, calculateDonutSlices, getRadarCoordinates } from '../utils/chartMath';

/* Horizontal Bar Chart Component */
function BarChart({ skills }) {
  const visibleSkills = getSortedSkills(skills, 12);

  return (
    <div>
      <p className="label" style={{ marginBottom: '1rem' }}>Proficiency by Skill</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {visibleSkills.map((s) => {
          const pct = LEVEL_VALUES[s.level] ?? 50;
          const color = CATEGORY_COLORS[s.category] ?? '#888';
          return (
            <div key={s.id}>
              <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%', width: `${pct}%`,
                    background: color, borderRadius: '2px',
                    transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Donut Chart SVG Component */
function DonutChart({ skills }) {
  const slices = calculateDonutSlices(skills);
  const total = skills.length;

  if (total === 0) return null;

  return (
    <div>
      <p className="label" style={{ marginBottom: '1rem' }}>Skills by Category</p>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <svg viewBox="0 0 160 160" style={{ width: '160px', height: '160px', flexShrink: 0 }}>
          {slices.map((s, i) => (
            <path key={i} d={s.d} fill={s.color} opacity="0.9" />
          ))}
          <circle cx={80} cy={80} r={34} fill="var(--bg-card)" />
          <text x={80} y={74} textAnchor="middle" fill="var(--text-primary)" style={{ fontFamily: 'var(--font-display)', fontSize: '18px' }}>
            {total}
          </text>
          <text x={80} y={90} textAnchor="middle" fill="var(--text-muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            SKILLS
          </text>
        </svg>

        {/* Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '1px', background: s.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.cat}
              </span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                {s.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Vertical Bar Chart Distribution Component */
function LevelDistribution({ skills }) {
  const dist = { Basic: 0, Intermediate: 0, Advanced: 0, Expert: 0 };
  skills.forEach((s) => { if (dist[s.level] !== undefined) dist[s.level]++; });

  const max = Math.max(...Object.values(dist), 1);

  return (
    <div>
      <p className="label" style={{ marginBottom: '1rem' }}>Level Distribution</p>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end', height: '100px' }}>
        {Object.entries(dist).map(([lvl, count]) => (
          <div key={lvl} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-secondary)' }}>{count}</span>
            <div
              style={{
                width: '100%', background: 'var(--accent)',
                borderRadius: '2px 2px 0 0', opacity: 0.85,
                height: `${(count / max) * 70}px`,
                minHeight: count > 0 ? '4px' : '0',
                transition: 'height 0.6s cubic-bezier(0.4,0,0.2,1)',
              }}
            />
            <span className="label" style={{ fontSize: '0.58rem' }}>{lvl.slice(0, 3).toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Radar Radial Chart SVG Component */
function RadarChart({ skills }) {
  const topSkills = getSortedSkills(skills, 6);
  if (topSkills.length < 3) return null;

  const cx = 110, cy = 110;
  const totalAxes = topSkills.length;
  const ringLevels = [25, 50, 75, 100];

  const dataPoints = topSkills.map((s, i) => getRadarCoordinates(i, LEVEL_VALUES[s.level] ?? 50, totalAxes));
  const polygonPoints = dataPoints.map((p) => p.join(',')).join(' ');

  return (
    <div>
      <p className="label" style={{ marginBottom: '1rem' }}>Top Skills Radar</p>
      <svg viewBox="0 0 220 220" style={{ width: '220px', height: '220px', display: 'block', margin: '0 auto' }}>
        {/* Radar Background Rings */}
        {ringLevels.map((lvl) => {
          const ring = topSkills.map((_, i) => getRadarCoordinates(i, lvl, totalAxes).join(',')).join(' ');
          return <polygon key={lvl} points={ring} fill="none" stroke="var(--border)" strokeWidth="0.8" />;
        })}

        {/* Radar Axes Lines */}
        {topSkills.map((_, i) => {
          const [x, y] = getRadarCoordinates(i, 100, totalAxes);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--border)" strokeWidth="0.8" />;
        })}

        {/* Data Shape Area */}
        <polygon points={polygonPoints} fill="rgba(200,255,0,0.12)" stroke="#c8ff00" strokeWidth="1.5" />

        {/* Data Vertices Dots */}
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#c8ff00" />
        ))}

        {/* Outer Axis Labels */}
        {topSkills.map((s, i) => {
          const [x, y] = getRadarCoordinates(i, 115, totalAxes);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="var(--text-secondary)"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {s.name.slice(0, 8)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* Main Dashboard Grid Wrapper Component */
export default function SkillChart() {
  const { cv } = useCV();
  const { skills } = cv;

  // Empty state view feedback
  if (skills.length === 0) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '200px', gap: '0.75rem', border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-md)', color: 'var(--text-muted)',
      }}>
        <span style={{ fontSize: '1.5rem' }}>◇</span>
        <p className="label">Add skills to see charts</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Row 1: Horizontal Bar Chart + Donut Segment */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card"><BarChart skills={skills} /></div>
        <div className="card"><DonutChart skills={skills} /></div>
      </div>

      {/* Row 2: Frequency Distribution Columns + Radar Web */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card"><LevelDistribution skills={skills} /></div>
        {skills.length >= 3 && <div className="card"><RadarChart skills={skills} /></div>}
      </div>
    </div>
  );
}
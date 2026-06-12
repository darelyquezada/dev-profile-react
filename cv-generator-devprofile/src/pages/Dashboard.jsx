import { Link } from 'react-router-dom';
import SkillChart from '../components/SkillChart';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { CATEGORY_COLORS } from '../utils/constants';

export default function Dashboard() {
  const { personal, skills, topSkill, categories, stats } = useDashboardStats();

  return (
    <main className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="divider-accent" />
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="display-md">Dashboard</h1>
              {personal.name && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.3rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                  {personal.name} — {personal.profession || 'No profession set'}
                </p>
              )}
            </div>
            <Link to="/editor" className="btn" style={{ textDecoration: 'none' }}>
              Edit Profile →
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0',
            marginBottom: '3rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '1.5rem',
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
                background: 'var(--bg-card)',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3.5rem',
                  lineHeight: 1,
                  color: s.value > 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                  marginBottom: '0.3rem',
                }}
              >
                {s.value}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                {s.label}
              </div>
              <div className="label">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Top skill highlight */}
        {topSkill && (
          <div
            className="animate-fade-up"
            style={{
              marginBottom: '3rem',
              padding: '1.5rem 2rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderLeft: `4px solid ${CATEGORY_COLORS[topSkill.category] ?? 'var(--accent)'}`,
              borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem',
            }}
          >
            <div>
              <span className="label" style={{ display: 'block', marginBottom: '0.3rem' }}>Top Skill</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', textTransform: 'uppercase' }}>
                {topSkill.name}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="label" style={{ display: 'block', marginBottom: '0.3rem' }}>Level</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: CATEGORY_COLORS[topSkill.category] ?? 'var(--accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {topSkill.level} · {topSkill.category}
              </span>
            </div>
          </div>
        )}

        {/* Charts */}
        {skills.length === 0 ? (
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '1.25rem',
              minHeight: '300px',
              border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--text-muted)' }}>◇</span>
            <p className="label">No skills added yet</p>
            <Link to="/editor" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Add your first skill
            </Link>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="display-sm">Skills Overview</div>
              <span className="label">{skills.length} skills across {categories.length} categories</span>
            </div>
            <SkillChart />
          </div>
        )}

        {/* Category breakdown */}
        {skills.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
              <span className="display-sm">By Category</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {categories.map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat);
                const pct = Math.round((catSkills.length / skills.length) * 100);
                const color = CATEGORY_COLORS[cat] ?? '#888';
                return (
                  <div
                    key={cat}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '140px 1fr 40px',
                      gap: '1rem', alignItems: 'center',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color }}>
                      {cat}
                    </span>
                    <div style={{ height: '2px', background: 'var(--border)', borderRadius: '1px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: '1px', transition: 'width 0.6s ease' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                      {catSkills.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
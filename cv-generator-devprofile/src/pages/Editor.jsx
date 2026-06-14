import { useCV } from '../context/CVContext';
import { useEditorTabs } from '../hooks/useEditorTabs';
import { EDITOR_TABS } from '../utils/constants';
import PersonalForm from '../components/PersonalForm';
import SkillForm from '../components/SkillForm';
import SkillCard from '../components/SkillCard';
import ProjectForm from '../components/ProjectForm';
import ProjectCard from '../components/ProjectCard';
import EducationForm from '../components/EducationForm';
import ExtraInfoForm from '../components/ExtraInfoForm';
import AvatarForm from '../components/AvatarForm';
import { useNavigate } from 'react-router-dom'; 

export default function Editor() {
  // Encapsulating view-state management hooks to isolate dynamic interactive states
  const {
    activeTab,
    setActiveTab,
    showSkillForm,
    setShowSkillForm,
    showProjectForm,
    setShowProjectForm,
  } = useEditorTabs();

  // Extracting live centralized data models directly from context provider boundaries
  const { cv } = useCV();

  // Initializing the application route dispatcher hook
  const navigate = useNavigate();

  return (
    <main className="page-wrapper">
      <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

        {/* Page header */}
        {/* Identifies view architecture profile objectives and structure status fields */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="divider-accent" />
          <div className="flex-between">
            <h1 className="display-md">CV Editor</h1>
            <span className="label">Fill in your professional information</span>
          </div>
        </div>

        {/* Tab bar */}
        {/* Horizontal scrollable tab layout handling routing emulation across schema subsets */}
        <div
          style={{
            display: 'flex', gap: '0', overflowX: 'auto',
            borderBottom: '1px solid var(--border)',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none',
          }}
        >
          {EDITOR_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none', border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  padding: '0.8rem 1.25rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.45rem',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                  marginBottom: '-1px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {tab.index}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {/* The 'key' attribute triggers dynamic CSS animation resets on component unmounting steps */}
        <div className="animate-fade-up" key={activeTab}>

          {/* Personal Form Module */}
          {activeTab === 'personal' && <PersonalForm />}

          {/* Skills Context Module */}
          {/* Automatically enforces visibility rules if the current sub-array structure returns empty */}
          {activeTab === 'skills' && (
            <div>
              {(showSkillForm || cv.skills.length === 0) && (
                <SkillForm onDone={() => setShowSkillForm(false)} />
              )}

              {cv.skills.length > 0 && !showSkillForm && (
                <>
                  <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <div>
                      <div className="form-section-title" style={{ marginBottom: '0.25rem' }}>Skills</div>
                      <span className="label">{cv.skills.length} skill{cv.skills.length !== 1 ? 's' : ''} added</span>
                    </div>
                    <button className="btn" onClick={() => setShowSkillForm(true)}>+ Add Skill</button>
                  </div>
                  <div className="grid-3">
                    {cv.skills.map((s) => <SkillCard key={s.id} skill={s} />)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Projects Context Module */}
          {/* Manages conditional nested rendering dependent on structural sub-form completion calls */}
          {activeTab === 'projects' && (
            <div>
              {(showProjectForm || cv.projects.length === 0) && (
                <ProjectForm onDone={() => setShowProjectForm(false)} />
              )}

              {cv.projects.length > 0 && !showProjectForm && (
                <>
                  <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                    <div>
                      <div className="form-section-title" style={{ marginBottom: '0.25rem' }}>Projects</div>
                      <span className="label">{cv.projects.length} project{cv.projects.length !== 1 ? 's' : ''} added</span>
                    </div>
                    <button className="btn" onClick={() => setShowProjectForm(true)}>+ Add Project</button>
                  </div>
                  <div className="grid-3">
                    {cv.projects.map((p) => <ProjectCard key={p.id} project={p} />)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Education Form Module */}
          {activeTab === 'education' && <EducationForm />}

          {/* Extra Info / Professional Experience Module */}
          {activeTab === 'extra' && <ExtraInfoForm />}
          
          {/* Avatar Image Module */}
          {activeTab === 'avatar' && <AvatarForm />}
          
        </div>

        {/* Bottom Navigation Utilities */}
        <div
          style={{
            marginTop: '3rem', paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}
        >
          {/* Redirects operational control directly to the master layout Preview workspace via App Router */}
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/preview')} // Navbar route path
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <span>View Preview</span>
            <span style={{ fontSize: '1rem' }}>→</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {/* Linear pagination dots tracking alternative layout entries */}
            {EDITOR_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    border: 'none', padding: 0, cursor: 'pointer',
                    background: isActive ? 'var(--accent)' : 'var(--border-accent)',
                    transition: 'background 0.2s ease',
                  }}
                  title={tab.label}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
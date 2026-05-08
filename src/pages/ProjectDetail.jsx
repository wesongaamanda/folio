import { useParams, useNavigate } from 'react-router-dom'
import styles from './ProjectDetail.module.css'

const CATEGORY_BG = {
  Design: '#dbeafe',
  Development: '#dcfce7',
  Branding: '#f3e8ff',
  Photography: '#fff7ed',
  Motion: '#ffe4e6',
}

export default function ProjectDetail({ projects, deleteProject, showToast }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const project = projects.find((p) => String(p.id) === id)

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found.</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to projects
        </button>
      </div>
    )
  }

  const { title, category, emoji, description, year, featured, tech, link } = project
  const thumbBg = CATEGORY_BG[category] || '#f0f0f0'

  function handleDelete() {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteProject(project.id)
      showToast('Project deleted.')
      navigate('/')
    }
  }

  return (
    <main className={styles.page}>
      <button className={styles.backBtn} onClick={() => navigate('/')}>
        ← Back to projects
      </button>

      <div className={styles.thumb} style={{ background: thumbBg }}>
        <span className={styles.emoji}>{emoji || '🎨'}</span>
      </div>

      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles.category}`}>{category}</span>
        <span className={styles.badge}>{year}</span>
        {featured && <span className={styles.badge}>Featured</span>}
      </div>

      <h1 className={styles.title}>{title}</h1>
      <p className={styles.desc}>{description}</p>

      {tech && tech.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Tech & Tools</p>
          <div className={styles.techStack}>
            {tech.map((t) => (
              <span key={t} className={styles.techPill}>{t}</span>
            ))}
          </div>
        </div>
      )}

      <div className={styles.actions}>
        <a
          href={link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.liveLink}
        >
          View Live Project ↗
        </a>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          Delete Project
        </button>
      </div>
    </main>
  )
}
import { useParams, useNavigate } from 'react-router-dom'
import { CATEGORY_BG } from '../data/projects'
import styles from './ProjectDetail.module.css'

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

  const { name, category, emoji, desc, year, featured, tech, link } = project
  const bgClass = CATEGORY_BG[category] || 'bg-other'

  function handleDelete() {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
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

      {/* Thumbnail */}
      <div className={`${styles.thumb} ${bgClass}`}>
        <span className={styles.emoji}>{emoji || '🎨'}</span>
      </div>

      {/* Meta badges */}
      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles.category}`}>{category}</span>
        <span className={styles.badge}>{year}</span>
        {featured && <span className={styles.badge}>Featured</span>}
      </div>

      {/* Title & Description */}
      <h1 className={styles.title}>{name}</h1>
      <p className={styles.desc}>{desc}</p>

      {/* Tech Stack */}
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

      {/* Actions */}
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

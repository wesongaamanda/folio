import { useNavigate } from 'react-router-dom'
import { CATEGORY_BG } from '../data/projects'
import styles from './ProjectCard.module.css'

export default function ProjectCard({ project }) {
  const navigate = useNavigate()
  const { id, name, category, emoji, desc, year, featured } = project
  const bgClass = CATEGORY_BG[category] || 'bg-other'

  return (
    <article
      className={styles.card}
      onClick={() => navigate(`/project/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${id}`)}
      aria-label={`View project: ${name}`}
    >
      {/* Thumbnail */}
      <div className={`${styles.thumb} ${bgClass}`}>
        <span className={styles.emoji}>{emoji || '🎨'}</span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.tags}>
          <span className={styles.tag}>{category}</span>
          {featured && <span className={`${styles.tag} ${styles.featured}`}>Featured</span>}
        </div>

        <h2 className={styles.name}>{name}</h2>
        <p className={styles.desc}>{desc}</p>

        <div className={styles.footer}>
          <span className={styles.year}>{year}</span>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </article>
  )
}

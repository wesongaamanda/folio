import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import FilterBar from '../components/FilterBar'
import styles from './Home.module.css'

export default function Home({ projects, featuredCount, categoryCount }) {
  const [filter, setFilter] = useState('All')

  const filtered = projects.filter((p) => {
    if (filter === 'All') return true
    if (filter === 'Featured') return p.featured
    return p.category === filter
  })

  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Creative Portfolio</p>
        <h1 className={styles.title}>
          Craft that<br />
          <em>speaks</em> for itself.
        </h1>
        <p className={styles.sub}>
          A curated collection of projects spanning design, development, and
          creative direction.
        </p>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{projects.length}</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{categoryCount}</span>
            <span className={styles.statLabel}>Disciplines</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNum}>{featuredCount}</span>
            <span className={styles.statLabel}>Featured</span>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No projects match this filter.</p>
          <button className={styles.clearBtn} onClick={() => setFilter('All')}>
            Clear filter
          </button>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </main>
  )
}

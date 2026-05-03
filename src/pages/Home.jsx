import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import FilterBar from '../components/FilterBar'
import SearchBar from '../components/SearchBar'
import styles from './Home.module.css'

export default function Home({ projects, featuredCount, categoryCount }) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  // When the user types a new search, reset the category filter to All
  function handleQueryChange(value) {
    setQuery(value)
    if (value) setFilter('All')
  }

  // When the user picks a filter chip, clear any active search
  function handleFilterChange(value) {
    setFilter(value)
    setQuery('')
  }

  function handleClearAll() {
    setQuery('')
    setFilter('All')
  }

  const filtered = projects.filter((p) => {
    // Category / featured filter
    const passesFilter =
      filter === 'All' ? true :
      filter === 'Featured' ? p.featured :
      p.category === filter

    // Search filter — matches name, category, description, or any tech tag
    const q = query.toLowerCase().trim()
    const passesSearch = q === '' || [
      p.name,
      p.category,
      p.desc,
      ...(p.tech || []),
    ].some((field) => field?.toLowerCase().includes(q))

    return passesFilter && passesSearch
  })

  const isFiltering = query || filter !== 'All'

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

      {/* Search Bar */}
      <SearchBar query={query} onQueryChange={handleQueryChange} />

      {/* Filter Bar */}
      <FilterBar activeFilter={filter} onFilterChange={handleFilterChange} />

      {/* Results count when searching/filtering */}
      {isFiltering && (
        <div className={styles.resultsMeta}>
          <span>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {query && <> for <strong>"{query}"</strong></>}
          </span>
          <button className={styles.clearAll} onClick={handleClearAll}>
            Clear all
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No projects match{query ? ` "${query}"` : ' this filter'}.</p>
          <button className={styles.clearBtn} onClick={handleClearAll}>
            Clear search
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

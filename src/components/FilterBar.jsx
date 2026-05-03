import styles from './FilterBar.module.css'

const FILTERS = ['All', 'Featured', 'Design', 'Development', 'Branding', 'Photography', 'Motion', 'Other']

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className={styles.bar}>
      <span className={styles.label}>Filter:</span>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={`${styles.chip} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

import styles from './SearchBar.module.css'

export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">⌕</span>
      <input
        className={styles.input}
        type="search"
        placeholder="Search projects by name, category, or tool…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search projects"
      />
      {query && (
        <button
          className={styles.clear}
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}

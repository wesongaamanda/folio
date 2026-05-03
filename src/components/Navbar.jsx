import { useNavigate, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        folio<span className={styles.dot}>.</span>
      </div>

      <div className={styles.links}>
        <button
          className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
          onClick={() => navigate('/')}
        >
          Work
        </button>
        <button
          className={styles.addBtn}
          onClick={() => navigate('/add')}
        >
          + Add Project
        </button>
      </div>
    </nav>
  )
}

import { EMOJIS } from '../data/projects'
import styles from './EmojiPicker.module.css'

export default function EmojiPicker({ selected, onSelect }) {
  return (
    <div className={styles.grid}>
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          type="button"
          className={`${styles.opt} ${selected === emoji ? styles.selected : ''}`}
          onClick={() => onSelect(emoji)}
          aria-label={`Select emoji ${emoji}`}
          aria-pressed={selected === emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}

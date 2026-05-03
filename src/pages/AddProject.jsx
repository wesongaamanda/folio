import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmojiPicker from '../components/EmojiPicker'
import { CATEGORIES } from '../data/projects'
import styles from './AddProject.module.css'

const CURRENT_YEAR = new Date().getFullYear()

const INITIAL_FORM = {
  name: '',
  category: 'Design',
  year: String(CURRENT_YEAR),
  desc: '',
  tech: '',
  link: '',
  featured: false,
  emoji: '🎨',
}

export default function AddProject({ addProject, showToast }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  // Generic field change handler
  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function handleEmojiSelect(emoji) {
    setForm((prev) => ({ ...prev, emoji }))
  }

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Project name is required'
    if (!form.desc.trim()) newErrors.desc = 'Description is required'
    if (!form.year) newErrors.year = 'Year is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      showToast('Please fill in all required fields.')
      return
    }

    const techArray = form.tech
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    addProject({
      name: form.name.trim(),
      category: form.category,
      year: form.year,
      desc: form.desc.trim(),
      tech: techArray,
      link: form.link.trim() || '#',
      featured: form.featured,
      emoji: form.emoji,
    })

    showToast('Project added successfully!')
    navigate('/')
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>New Entry</p>
        <h1 className={styles.title}>
          Add a project<br />to your folio.
        </h1>
      </div>

      <form className={styles.card} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>

          {/* Project Name */}
          <div className={`${styles.group} ${styles.full}`}>
            <label htmlFor="name">Project Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Orbit Brand Identity"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? styles.inputError : ''}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          {/* Category */}
          <div className={styles.group}>
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className={styles.group}>
            <label htmlFor="year">Year *</label>
            <input
              id="year"
              name="year"
              type="number"
              min="2000"
              max="2030"
              value={form.year}
              onChange={handleChange}
              className={errors.year ? styles.inputError : ''}
            />
            {errors.year && <span className={styles.error}>{errors.year}</span>}
          </div>

          {/* Description */}
          <div className={`${styles.group} ${styles.full}`}>
            <label htmlFor="desc">Description *</label>
            <textarea
              id="desc"
              name="desc"
              placeholder="Describe what this project is about, the problem it solves, and your role."
              value={form.desc}
              onChange={handleChange}
              className={errors.desc ? styles.inputError : ''}
            />
            {errors.desc && <span className={styles.error}>{errors.desc}</span>}
          </div>

          {/* Tech Stack */}
          <div className={`${styles.group} ${styles.full}`}>
            <label htmlFor="tech">Tech & Tools</label>
            <input
              id="tech"
              name="tech"
              type="text"
              placeholder="React, Figma, Python (comma-separated)"
              value={form.tech}
              onChange={handleChange}
            />
            <p className={styles.hint}>Separate multiple tools with commas</p>
          </div>

          {/* Project Link */}
          <div className={`${styles.group} ${styles.full}`}>
            <label htmlFor="link">Project Link</label>
            <input
              id="link"
              name="link"
              type="url"
              placeholder="https://..."
              value={form.link}
              onChange={handleChange}
            />
          </div>

          {/* Emoji Picker */}
          <div className={`${styles.group} ${styles.full}`}>
            <label>Pick an Icon</label>
            <EmojiPicker
              selected={form.emoji}
              onSelect={handleEmojiSelect}
            />
          </div>

          {/* Featured */}
          <div className={styles.group}>
            <label className={styles.checkLabel}>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className={styles.checkbox}
              />
              Mark as featured project
            </label>
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Add to Portfolio →
        </button>
      </form>
    </main>
  )
}

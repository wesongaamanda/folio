import { useState, useEffect, useCallback } from 'react'

const API_URL = 'http://localhost:3001/projects'

const STORAGE_KEY = 'portfolio_projects'

const DEFAULT_PROJECTS = [
  {
    id: 1,
    name: 'Lumina Design System',
    category: 'Design',
    emoji: '💎',
    desc: 'A comprehensive design system for enterprise SaaS products, covering typography, color tokens, and 120+ production-ready components.',
    year: '2024',
    tech: ['Figma', 'Storybook', 'React', 'TypeScript'],
    link: 'https://example.com',
    featured: true,
  },
  {
    id: 2,
    name: 'Greenpath App',
    category: 'Development',
    emoji: '🌿',
    desc: 'Full-stack sustainability tracker that helps individuals and teams measure and offset their carbon footprint in real time.',
    year: '2024',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'Python'],
    link: 'https://example.com',
    featured: false,
  },
  {
    id: 3,
    name: 'Orbit Brand Identity',
    category: 'Branding',
    emoji: '🔮',
    desc: 'Complete visual identity for a space-tech startup — wordmark, iconography, motion guidelines, and brand voice documentation.',
    year: '2023',
    tech: ['Illustrator', 'After Effects', 'Figma'],
    link: 'https://example.com',
    featured: true,
  },
  {
    id: 4,
    name: 'Wave Music Platform',
    category: 'Development',
    emoji: '🎵',
    desc: 'A social music discovery platform with AI-generated playlists and real-time collaborative listening rooms powered by WebSockets.',
    year: '2023',
    tech: ['React', 'Node.js', 'WebSockets', 'Spotify API'],
    link: 'https://example.com',
    featured: false,
  },
  {
    id: 5,
    name: 'Urban Frames',
    category: 'Photography',
    emoji: '📷',
    desc: 'A curated series documenting the interplay of light, architecture, and human movement across five cities over two years.',
    year: '2022',
    tech: ['Lightroom', 'Photoshop'],
    link: 'https://example.com',
    featured: false,
  },
  {
    id: 6,
    name: 'Kinetic Motion Reel',
    category: 'Motion',
    emoji: '🎬',
    desc: 'Showreel of motion graphics and animation work for clients across fintech, healthcare, and consumer brands.',
    year: '2022',
    tech: ['After Effects', 'Cinema 4D', 'Premiere'],
    link: 'https://example.com',
    featured: false,
  },
]

// ─── Helpers ────────────────────────────────────────────────
function isLocalhost() {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  )
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveToStorage(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    console.warn('localStorage unavailable')
  }
}

// ─── Hook ───────────────────────────────────────────────────
export function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ── Initial load ──────────────────────────────────────────
  useEffect(() => {
    if (isLocalhost()) {
      // Try json-server first
      fetch(API_URL)
        .then((res) => {
          if (!res.ok) throw new Error('json-server not running')
          return res.json()
        })
        .then((data) => {
          setProjects(data)
          saveToStorage(data)
        })
        .catch(() => {
          // json-server unavailable — fall back to localStorage or defaults
          const stored = loadFromStorage()
          setProjects(stored ?? DEFAULT_PROJECTS)
        })
        .finally(() => setLoading(false))
    } else {
      // Deployed on GitHub Pages — use localStorage, seed defaults if empty
      const stored = loadFromStorage()
      if (stored && stored.length > 0) {
        setProjects(stored)
      } else {
        saveToStorage(DEFAULT_PROJECTS)
        setProjects(DEFAULT_PROJECTS)
      }
      setLoading(false)
    }
  }, [])

  // ── Add project ───────────────────────────────────────────
  const addProject = useCallback(async (projectData) => {
    const newProject = { ...projectData, id: Date.now() }

    if (isLocalhost()) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProject),
        })
        if (res.ok) {
          const saved = await res.json()
          // Update state + localStorage, then return — do NOT fall through
          setProjects((prev) => {
            const updated = [saved, ...prev]
            saveToStorage(updated)
            return updated
          })
          return saved
        }
      } catch {
        // json-server unavailable — fall through to localStorage save below
      }
    }

    // Deployed or server unavailable — save to localStorage only
    setProjects((prev) => {
      const updated = [newProject, ...prev]
      saveToStorage(updated)
      return updated
    })
    return newProject
  }, [])

  // ── Delete project ────────────────────────────────────────
  const deleteProject = useCallback(async (id) => {
    if (isLocalhost()) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      } catch {
        // json-server unavailable — still remove from local state below
      }
    }

    // Always remove from state + localStorage regardless of server response
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id)
      saveToStorage(updated)
      return updated
    })
  }, [])

  // ── Derived values ────────────────────────────────────────
  const featuredCount = projects.filter((p) => p.featured).length
  const categoryCount = new Set(projects.map((p) => p.category)).size

  return {
    projects,
    loading,
    error,
    addProject,
    deleteProject,
    featuredCount,
    categoryCount,
  }
}
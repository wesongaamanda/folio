import { useState, useEffect } from 'react'

const STORAGE_KEY = 'folio_projects'

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'Lumina Design System',
    description: 'A comprehensive design system for enterprise SaaS products, covering typography, color, and 120+ components.',
    category: 'Design',
    tags: ['Design', 'Featured'],
    year: 2024,
    featured: true,
    emoji: '💎',
    gradient: 'linear-gradient(135deg, #d4cfe8 0%, #c5bfdf 100%)'
  },
  {
    id: 2,
    title: 'Greenpath App',
    description: 'Full-stack sustainability tracker that helps individuals and teams measure and offset their carbon footprint.',
    category: 'Development',
    tags: ['Development'],
    year: 2024,
    featured: false,
    emoji: '🌿',
    gradient: 'linear-gradient(135deg, #c8ddd0 0%, #b5cebf 100%)'
  },
  {
    id: 3,
    title: 'Orbit Brand Identity',
    description: 'Complete visual identity for a space-tech startup — wordmark, iconography, motion guidelines, and brand voice.',
    category: 'Branding',
    tags: ['Branding', 'Featured'],
    year: 2023,
    featured: true,
    emoji: '🔮',
    gradient: 'linear-gradient(135deg, #e8ddd0 0%, #ddd0c0 100%)'
  },
  {
    id: 4,
    title: 'Wave Music Platform',
    description: 'A social music discovery platform with AI-generated playlists and real-time collaborative listening rooms.',
    category: 'Development',
    tags: ['Development'],
    year: 2023,
    featured: false,
    emoji: '🎵',
    gradient: 'linear-gradient(135deg, #c8d8e8 0%, #b5c8dc 100%)'
  },
  {
    id: 5,
    title: 'Urban Frames',
    description: 'A curated series documenting the interplay of light, architecture, and human movement across five cities.',
    category: 'Photography',
    tags: ['Photography'],
    year: 2022,
    featured: false,
    emoji: '📷',
    gradient: 'linear-gradient(135deg, #e0dcd8 0%, #d0ccc8 100%)'
  },
  {
    id: 6,
    title: 'Kinetic Motion Reel',
    description: 'Showreel of motion graphics and animation work for clients across fintech, healthcare, and consumer brands.',
    category: 'Motion',
    tags: ['Motion'],
    year: 2022,
    featured: false,
    emoji: '🎬',
    gradient: 'linear-gradient(135deg, #e8d8dc 0%, #dcc8cc 100%)'
  }
]

const CATEGORIES = ['All', 'Design', 'Development', 'Branding', 'Photography', 'Motion']

const EMOJI_MAP = {
  Design: '💎',
  Development: '⚡',
  Branding: '🎨',
  Photography: '📷',
  Motion: '🎬'
}

const GRADIENT_MAP = {
  Design: 'linear-gradient(135deg, #d4cfe8 0%, #c5bfdf 100%)',
  Development: 'linear-gradient(135deg, #c8d8e8 0%, #b5c8dc 100%)',
  Branding: 'linear-gradient(135deg, #e8ddd0 0%, #ddd0c0 100%)',
  Photography: 'linear-gradient(135deg, #e0dcd8 0%, #d0ccc8 100%)',
  Motion: 'linear-gradient(135deg, #e8d8dc 0%, #dcc8cc 100%)'
}

function loadProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {
    console.error('Failed to load projects from localStorage', e)
  }
  return INITIAL_PROJECTS
}

export function useProjects() {
  const [projects, setProjects] = useState(loadProjects)

  // Persist to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    } catch (e) {
      console.error('Failed to save projects to localStorage', e)
    }
  }, [projects])

  const addProject = (newProject) => {
    const project = {
      ...newProject,
      id: Date.now(),
      year: new Date().getFullYear(),
      featured: false,
      emoji: EMOJI_MAP[newProject.category] || '✨',
      gradient: GRADIENT_MAP[newProject.category] || 'linear-gradient(135deg, #e8e4de 0%, #ddd8d2 100%)'
    }
    setProjects(prev => [...prev, project])
  }

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  return { projects, categories: CATEGORIES, addProject, deleteProject }
}
import { useState, useCallback } from 'react'
import { SAMPLE_PROJECTS } from '../data/projects'

const STORAGE_KEY = 'portfolio_projects'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : SAMPLE_PROJECTS
  } catch {
    return SAMPLE_PROJECTS
  }
}

function saveToStorage(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    console.warn('localStorage unavailable')
  }
}

export function useProjects() {
  const [projects, setProjects] = useState(loadFromStorage)

  const addProject = useCallback((projectData) => {
    const newProject = {
      ...projectData,
      id: Date.now(),
    }
    setProjects((prev) => {
      const updated = [newProject, ...prev]
      saveToStorage(updated)
      return updated
    })
    return newProject
  }, [])

  const deleteProject = useCallback((id) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id)
      saveToStorage(updated)
      return updated
    })
  }, [])

  const featuredCount = projects.filter((p) => p.featured).length
  const categories = [...new Set(projects.map((p) => p.category))]

  return {
    projects,
    addProject,
    deleteProject,
    featuredCount,
    categoryCount: categories.length,
  }
}

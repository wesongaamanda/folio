import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddProject from './pages/AddProject'
import ProjectDetail from './pages/ProjectDetail'
import { useProjects } from './hooks/useProjects'

export default function App() {
  const { projects, categories, addProject, deleteProject } = useProjects()
  const [toast, setToast] = useState(null)

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const featuredCount = projects.filter((p) => p.featured).length
  const categoryCount = new Set(projects.map((p) => p.category)).size

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              projects={projects}
              featuredCount={featuredCount}
              categoryCount={categoryCount}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddProject addProject={addProject} showToast={showToast} />
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProjectDetail
              projects={projects}
              deleteProject={deleteProject}
              showToast={showToast}
            />
          }
        />
      </Routes>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

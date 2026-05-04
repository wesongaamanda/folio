import { Routes, Route } from 'react-router-dom'
import { useProjects } from './hooks/useProjects'
import { useToast } from './hooks/useToast'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Home from './pages/Home'
import AddProject from './pages/AddProject'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const { projects, loading, addProject, deleteProject, featuredCount, categoryCount } =
    useProjects()
  const { toast, showToast } = useToast()

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'60vh', fontFamily:'var(--mono)', fontSize:'0.8rem', color:'var(--muted)', letterSpacing:'0.08em' }}>
          Loading projects…
        </div>
      </>
    )
  }

  return (
    <>
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
          element={<AddProject addProject={addProject} showToast={showToast} />}
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
      {toast && <Toast message={toast} />}
    </>
  )
}

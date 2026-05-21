import { useState, useEffect, useCallback, useMemo } from 'react'
import api from '../services/api'
import ProjectCard from '../components/ProjectCard'
import ProjectModal from '../components/ProjectModal'
import toast from 'react-hot-toast'
import { Plus, Search, ChevronLeft, ChevronRight, FolderOpen, Sparkles } from 'lucide-react'

const STATUSES = ['', 'ACTIVE', 'INACTIVE', 'COMPLETED', 'ARCHIVED']

export default function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatus] = useState('')
  const [page, setPage] = useState(0)
  const [totalPages, setTotal] = useState(0)

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, size: 9, sortBy: 'createdAt' })
      if (statusFilter) params.set('status', statusFilter)
      const res = await api.get(`/projects?${params.toString()}`)
      const data = res.data.data
      setProjects(data.content || [])
      setTotal(data.totalPages || 0)
    } catch {
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCreate = async (form) => {
    await api.post('/projects', form)
    toast.success('Project created')
    setModalOpen(false)
    fetchProjects()
  }

  const handleUpdate = async (form) => {
    await api.put(`/projects/${editing.id}`, form)
    toast.success('Project updated')
    setEditing(null)
    setModalOpen(false)
    fetchProjects()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    toast.success('Project deleted')
    fetchProjects()
  }

  const openEdit = (project) => {
    setEditing(project)
    setModalOpen(true)
  }

  const openNew = () => {
    setEditing(null)
    setModalOpen(true)
  }

  const filtered = useMemo(() => {
    return projects.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    )
  }, [projects, search])

  return (
    <div className="space-y-5 md:space-y-6">
      <section className="panel p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400 mb-1">Project Command</p>
          <h2 className="text-2xl font-semibold">Your Projects</h2>
          <p className="text-sm text-slate-400 mt-1">{projects.length} loaded this page with live filtering and status control.</p>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 whitespace-nowrap">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </section>

      <section className="grid gap-3 md:grid-cols-[1fr,220px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input className="input pl-10" placeholder="Search by title or description" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input" value={statusFilter} onChange={(e) => { setStatus(e.target.value); setPage(0) }}>
          {STATUSES.map((s) => <option key={s} value={s}>{s || 'All statuses'}</option>)}
        </select>
      </section>

      {loading ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="panel p-5 animate-pulse">
              <div className="h-4 bg-slate-700 rounded mb-3 w-2/3" />
              <div className="h-3 bg-slate-800 rounded mb-2" />
              <div className="h-3 bg-slate-800 rounded w-4/5" />
            </div>
          ))}
        </section>
      ) : filtered.length === 0 ? (
        <section className="panel p-12 text-center">
          <FolderOpen className="w-12 h-12 mx-auto mb-3 text-slate-500" />
          <p className="text-lg font-medium">No projects found</p>
          <p className="text-slate-400 text-sm mt-1">Try another filter or create your first project.</p>
        </section>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 stagger">
          {filtered.map((p, i) => (
            <div key={p.id} style={{ '--delay': `${i * 60}ms` }}>
              <ProjectCard project={p} onEdit={openEdit} onDelete={handleDelete} />
            </div>
          ))}
        </section>
      )}

      <section className="panel p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-200" />
          Smooth project grid with animated entry and hover state.
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button onClick={() => setPage((p) => p - 1)} disabled={page === 0} className="btn-ghost disabled:opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-slate-300">Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages - 1} className="btn-ghost disabled:opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <ProjectModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSubmit={editing ? handleUpdate : handleCreate}
        initial={editing}
      />
    </div>
  )
}

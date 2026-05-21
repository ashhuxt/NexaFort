import { Pencil, Trash2, Calendar } from 'lucide-react'

const STATUS_COLORS = {
  ACTIVE: 'bg-emerald-300/15 text-emerald-200 border-emerald-200/30',
  INACTIVE: 'bg-slate-500/15 text-slate-300 border-slate-300/20',
  COMPLETED: 'bg-cyan-300/15 text-cyan-100 border-cyan-200/30',
  ARCHIVED: 'bg-amber-300/15 text-amber-100 border-amber-200/30',
}

const PRIORITY_COLORS = {
  LOW: 'text-slate-300',
  MEDIUM: 'text-amber-100',
  HIGH: 'text-orange-300',
  CRITICAL: 'text-rose-300',
}

export default function ProjectCard({ project, onEdit, onDelete }) {
  const date = new Date(project.createdAt).toLocaleDateString()

  return (
    <article className="panel p-5 transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg leading-snug line-clamp-1 flex-1 mr-2">{project.title}</h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => onEdit(project)} className="btn-ghost !px-2 !py-1.5">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(project.id)} className="btn-ghost !px-2 !py-1.5 hover:!border-rose-300/50 hover:text-rose-200">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {project.description && <p className="text-slate-400 text-sm line-clamp-2 mb-4">{project.description}</p>}

      <div className="flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-2.5 py-1 rounded-full border ${STATUS_COLORS[project.status]}`}>{project.status}</span>
        <span className={`text-xs font-medium ${PRIORITY_COLORS[project.priority]}`}>Priority: {project.priority}</span>
        <span className="ml-auto flex items-center gap-1 text-slate-500 text-xs">
          <Calendar className="w-3 h-3" /> {date}
        </span>
      </div>
    </article>
  )
}

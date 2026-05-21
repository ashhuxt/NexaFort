import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const STATUSES = ['ACTIVE', 'INACTIVE', 'COMPLETED', 'ARCHIVED']
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

export default function ProjectModal({ isOpen, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'ACTIVE', priority: 'MEDIUM' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description || '',
        status: initial.status,
        priority: initial.priority,
      })
    } else {
      setForm({ title: '', description: '', status: 'ACTIVE', priority: 'MEDIUM' })
    }
  }, [initial, isOpen])

  if (!isOpen) return null

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="panel w-full max-w-xl p-6 route-enter">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">{initial ? 'Edit Project' : 'Create Project'}</h2>
          <button onClick={onClose} className="btn-ghost !px-2 !py-1.5"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-300 mb-1 block">Title</label>
            <input className="input" placeholder="Project title" value={form.title} onChange={set('title')} required />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-1 block">Description</label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Describe your project goals"
              value={form.description}
              onChange={set('description')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Status</label>
              <select className="input" value={form.status} onChange={set('status')}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Priority</label>
              <select className="input" value={form.priority} onChange={set('priority')}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" className="btn-ghost flex-1" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary flex-1" disabled={saving}>{saving ? 'Saving...' : initial ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

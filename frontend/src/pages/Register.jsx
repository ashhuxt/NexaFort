import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { User, Mail, Lock } from 'lucide-react'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      toast.success('Account created!')
      navigate('/app/overview')
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md panel p-7 md:p-8 route-enter">
        <div className="text-center mb-7">
          <div className="orb mx-auto mb-4" />
          <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
          <p className="text-slate-400 mt-1">Start managing projects with confidence</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { key: 'name', icon: User, type: 'text', label: 'Full Name', placeholder: 'Aarav Sharma' },
            { key: 'email', icon: Mail, type: 'email', label: 'Email', placeholder: 'you@company.com' },
            { key: 'password', icon: Lock, type: 'password', label: 'Password', placeholder: 'Minimum 8 chars' },
          ].map(({ key, icon: Icon, type, label, placeholder }) => (
            <div key={key}>
              <label className="text-sm text-slate-300 mb-1.5 block">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  className="input pl-10"
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={set(key)}
                  required
                />
              </div>
            </div>
          ))}

          <button className="btn-primary w-full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-5 text-sm">
          Have an account? <Link to="/login" className="text-cyan-200 hover:text-cyan-100">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

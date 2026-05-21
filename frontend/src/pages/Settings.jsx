import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import toast from 'react-hot-toast'
import { BellRing, Globe, ShieldCheck, SunMedium, MoonStar } from 'lucide-react'

const PREFS_KEY = 'nexafort_workspace_prefs'

export default function Settings() {
  const { user } = useAuth()
  const { theme, isDark, toggleTheme } = useTheme()
  const [origins, setOrigins] = useState('http://localhost:5173')
  const [alerts, setAlerts] = useState(true)

  const initials = useMemo(() => {
    if (!user?.name) return 'NF'
    return user.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()
  }, [user?.name])

  useEffect(() => {
    const stored = localStorage.getItem(PREFS_KEY)
    if (!stored) return

    try {
      const prefs = JSON.parse(stored)
      if (prefs.origins) setOrigins(prefs.origins)
      if (typeof prefs.alerts === 'boolean') setAlerts(prefs.alerts)
    } catch {
      localStorage.removeItem(PREFS_KEY)
    }
  }, [])

  const savePrefs = () => {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ origins, alerts }))
    toast.success('Preferences saved locally')
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[0.95fr,1.05fr]">
      <section className="panel p-6">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-300 to-amber-300 text-slate-950 font-bold text-xl grid place-items-center">
          {initials}
        </div>
        <h2 className="text-xl font-semibold mt-4">{user?.name}</h2>
        <p className="text-dim">{user?.email}</p>
        <p className="text-xs mt-3 chip inline-block">{user?.role}</p>
        <div className="mt-5 space-y-3">
          <div className="panel-strong p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-300" />
              <div>
                <p className="font-medium">Workspace Security</p>
                <p className="text-sm text-dim">Session handling and route protection are active.</p>
              </div>
            </div>
          </div>
          <div className="panel-strong p-4">
            <div className="flex items-center gap-3">
              <BellRing className="w-5 h-5 text-amber-300" />
              <div>
                <p className="font-medium">Notification Profile</p>
                <p className="text-sm text-dim">Alert preferences are stored locally for this browser.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-6 space-y-5">
        <div className="flex items-center justify-between panel-strong p-4">
          <div className="flex items-center gap-3">
            {isDark ? <MoonStar className="w-5 h-5 text-cyan-300" /> : <SunMedium className="w-5 h-5 text-amber-400" />}
            <div>
              <p className="font-medium">Appearance Mode</p>
              <p className="text-sm text-dim">Switch between dark and light presentation.</p>
            </div>
          </div>
          <button className="btn-ghost" onClick={toggleTheme}>
            {theme === 'dark' ? 'Use Light' : 'Use Dark'}
          </button>
        </div>

        <div>
          <label className="block text-sm mb-2">Allowed Origin</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
            <input className="input pl-10" value={origins} onChange={(e) => setOrigins(e.target.value)} />
          </div>
          <p className="text-xs text-dim mt-2">Useful when aligning frontend origin values with backend CORS configuration.</p>
        </div>

        <label className="flex items-center justify-between panel-strong p-4 cursor-pointer">
          <span className="text-sm">Enable security alerts</span>
          <input
            type="checkbox"
            checked={alerts}
            onChange={(e) => setAlerts(e.target.checked)}
            className="h-4 w-4 accent-cyan-300"
          />
        </label>

        <button className="btn-primary" onClick={savePrefs}>Save Preferences</button>
      </section>
    </div>
  )
}

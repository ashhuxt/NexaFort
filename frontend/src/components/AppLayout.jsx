import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useMemo } from 'react'
import { LayoutDashboard, FolderKanban, LineChart, Map, Settings, LogOut, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { to: '/app/overview', label: 'Overview', icon: LayoutDashboard },
  { to: '/app/projects', label: 'Projects', icon: FolderKanban },
  { to: '/app/insights', label: 'Insights', icon: LineChart },
  { to: '/app/roadmap', label: 'Roadmap', icon: Map },
  { to: '/app/settings', label: 'Settings', icon: Settings },
]

export default function AppLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme, isDark } = useTheme()
  const { pathname } = useLocation()

  const pageTitle = useMemo(() => {
    const item = NAV_ITEMS.find((nav) => pathname.startsWith(nav.to))
    return item?.label || 'Workspace'
  }, [pathname])

  return (
    <div className="min-h-screen cosmic-bg">
      <div className="mx-auto max-w-[1400px] px-4 md:px-6 py-5 md:py-7">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-[270px,1fr]">
          <aside className="panel-strong p-4 md:p-5 h-fit">
            <div className="flex items-center gap-3 mb-8">
              <span className="orb h-10 w-10" />
              <div>
                <p className="text-sm uppercase tracking-[0.16em] text-cyan-200/70">NexaFort</p>
                <p className="text-xs text-dim">Secure Project Orbit</p>
              </div>
            </div>

            <nav className="space-y-2">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-cyan-300/14 border border-cyan-200/30 text-cyan-100'
                        : 'text-dim hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium tracking-wide">{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-8 panel p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-dim mb-1">Current User</p>
              <p className="font-semibold truncate">{user?.name}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="orbit-dot" />
                <span className="text-xs text-dim">{user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Workspace User'}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button onClick={toggleTheme} className="btn-ghost flex items-center justify-center gap-2">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} {isDark ? 'Light' : 'Dark'}
              </button>
              <button onClick={logout} className="btn-ghost flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Exit
              </button>
            </div>
          </aside>

          <section className="space-y-4 md:space-y-6 min-w-0">
            <header className="panel p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-dim">Control Center</p>
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{pageTitle}</h1>
                </div>
                <div className="chip hidden md:block">{theme.toUpperCase()} MODE</div>
              </div>
            </header>

            <main>
              <Outlet />
            </main>
          </section>
        </div>
      </div>
    </div>
  )
}

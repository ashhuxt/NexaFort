import { Rocket, ShieldCheck, Timer, Users } from 'lucide-react'

const stats = [
  { label: 'Active Security Rules', value: '24', trend: '+4 this week', icon: ShieldCheck },
  { label: 'Teams Online', value: '08', trend: '98% healthy uptime', icon: Users },
  { label: 'Project Throughput', value: '91%', trend: '12% faster cycle', icon: Rocket },
  { label: 'Avg Response Time', value: '312ms', trend: 'Lower than target', icon: Timer },
]

export default function Overview() {
  return (
    <div className="space-y-5 md:space-y-6">
      <section className="panel p-6 md:p-8 overflow-hidden relative">
        <div className="absolute -top-16 -right-10 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Welcome to your command deck. Track the health of delivery, security posture, and execution velocity from one place.
          Everything below updates smoothly as your workspace grows.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 stagger">
        {stats.map(({ label, value, trend, icon: Icon }, i) => (
          <article key={label} className="panel p-5" style={{ '--delay': `${i * 90}ms` }}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs tracking-[0.14em] uppercase text-slate-400">{label}</p>
                <p className="text-2xl font-semibold mt-2">{value}</p>
              </div>
              <Icon className="w-5 h-5 text-cyan-200" />
            </div>
            <p className="text-sm text-slate-400 mt-4">{trend}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr,0.8fr]">
        <article className="panel p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Pulse</h2>
          <div className="space-y-4">
            {[72, 84, 67, 92].map((point, index) => (
              <div key={index}>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Sprint {index + 1}</span>
                  <span>{point}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-300 animate-rise" style={{ width: `${point}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel p-6">
          <h2 className="text-lg font-semibold mb-4">Mission Notes</h2>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="chip">Strengthen API key lifecycle checks in the next release.</li>
            <li className="chip">Two onboarding cohorts are scheduled for Friday.</li>
            <li className="chip">Roadmap execution is on track with zero blockers.</li>
          </ul>
        </article>
      </section>
    </div>
  )
}

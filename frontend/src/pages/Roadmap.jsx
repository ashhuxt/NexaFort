import { CheckCircle2, Clock3, Flag } from 'lucide-react'

const milestones = [
  { title: 'Workspace Guardrails', owner: 'Platform Team', status: 'Completed', date: 'Apr 28', icon: CheckCircle2 },
  { title: 'Audit Visibility Revamp', owner: 'Security Team', status: 'In Progress', date: 'Jun 02', icon: Clock3 },
  { title: 'Enterprise SSO Rollout', owner: 'Auth Team', status: 'Planned', date: 'Jun 16', icon: Flag },
  { title: 'Predictive Capacity Alerts', owner: 'SRE Team', status: 'Planned', date: 'Jul 03', icon: Flag },
]

const statusTone = {
  Completed: 'text-emerald-300 border-emerald-300/40',
  'In Progress': 'text-amber-200 border-amber-200/40',
  Planned: 'text-cyan-200 border-cyan-200/40',
}

export default function Roadmap() {
  return (
    <section className="panel p-6 md:p-7">
      <h2 className="text-xl font-semibold mb-6">Execution Roadmap</h2>
      <div className="space-y-4 stagger">
        {milestones.map((item, i) => {
          const Icon = item.icon
          return (
            <article key={item.title} className="panel-strong p-4" style={{ '--delay': `${i * 90}ms` }}>
              <div className="flex items-start gap-4">
                <div className="mt-1"><Icon className="w-5 h-5 text-slate-200" /></div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    <h3 className="font-semibold">{item.title}</h3>
                    <span className={`chip ${statusTone[item.status]}`}>{item.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Owner: {item.owner}</p>
                  <p className="text-xs text-slate-500 mt-2">Target: {item.date}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

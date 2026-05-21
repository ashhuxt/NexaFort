import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

const velocityData = [
  { sprint: 'S1', completed: 21, planned: 24 },
  { sprint: 'S2', completed: 24, planned: 24 },
  { sprint: 'S3', completed: 19, planned: 22 },
  { sprint: 'S4', completed: 27, planned: 28 },
  { sprint: 'S5', completed: 29, planned: 30 },
  { sprint: 'S6', completed: 31, planned: 32 },
]

const statusData = [
  { name: 'Active', value: 14, color: '#32d6c0' },
  { name: 'Completed', value: 22, color: '#ffd166' },
  { name: 'Archived', value: 6, color: '#7ea0b8' },
]

const riskData = [
  { category: 'Security', score: 88 },
  { category: 'Delivery', score: 79 },
  { category: 'Reliability', score: 92 },
  { category: 'Compliance', score: 84 },
]

export default function Insights() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <section className="panel p-5 md:p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Sprint Velocity Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#32d6c0" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#32d6c0" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(126,160,184,0.2)" />
              <XAxis dataKey="sprint" stroke="var(--text-dim)" />
              <YAxis stroke="var(--text-dim)" />
              <Tooltip contentStyle={{ background: 'var(--panel-strong)', border: '1px solid var(--line)', borderRadius: '10px' }} />
              <Legend />
              <Area type="monotone" dataKey="planned" stroke="#ffd166" fillOpacity={0} strokeWidth={2} />
              <Area type="monotone" dataKey="completed" stroke="#32d6c0" fill="url(#completedGradient)" strokeWidth={2.4} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Project Status Mix</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} innerRadius={50}>
                {statusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--panel-strong)', border: '1px solid var(--line)', borderRadius: '10px' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Risk Posture</h2>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskData} margin={{ left: 0, right: 10, top: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="rgba(126,160,184,0.2)" />
              <XAxis dataKey="category" stroke="var(--text-dim)" />
              <YAxis stroke="var(--text-dim)" domain={[0, 100]} />
              <Tooltip contentStyle={{ background: 'var(--panel-strong)', border: '1px solid var(--line)', borderRadius: '10px' }} />
              <Bar dataKey="score" radius={[8, 8, 0, 0]} fill="#ffd166" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

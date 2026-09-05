export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-xl border border-charcoal-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-charcoal-400">{stat.trend}</span>
          </div>
          <p className="text-2xl font-extrabold font-heading text-charcoal-800">{stat.value}</p>
          <p className="text-xs text-charcoal-500 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

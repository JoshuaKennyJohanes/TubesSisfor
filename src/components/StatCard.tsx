type StatCardProps = {
  label: string
  value: string | number
  note?: string
  warning?: boolean
}

export default function StatCard({ label, value, note, warning }: StatCardProps) {
  return (
    <div className={warning ? 'stat-card stat-card-warning' : 'stat-card'}>
      <div className="stat-card-label">{label}</div>
      <div className="stat-card-value">{value}</div>
      {note && <div className="stat-card-note">{note}</div>}
    </div>
  )
}
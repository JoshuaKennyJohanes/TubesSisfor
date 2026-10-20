import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import StatCard from './components/StatCard'
import './Dashboard.css'

type Staff = {
  staffno: string
  fname: string
  lname: string
  sposition: string
  branchno: string
}

type Stats = {
  total_properti: number
  total_klien: number
  total_staff: number
  total_viewing: number
  rata_rata_sewa: number
  properti_tanpa_staff: number
  properti_belum_dilihat: number
}

export default function Dashboard() {
  const [staff, setStaff] = useState<Staff | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const { data, error } = await supabase
        .from('staff')
        .select('staffno, fname, lname, sposition, branchno')
        .maybeSingle<Staff>()

      if (error) setErrorMessage(error.message)
      else setStaff(data)
    }

    async function loadStats() {
      const { data, error } = await supabase.rpc('get_dashboard_stats')

      if (error) setErrorMessage(error.message)
      else if (data && data.length > 0) setStats(data[0] as Stats)
    }

    loadProfile()
    loadStats()
  }, [])

  return (
    <div>
      <div className="dashboard-welcome">
        {staff ? (
          <>
            <h1 className="dashboard-title">Halo, {staff.fname} {staff.lname}</h1>
            <p className="dashboard-subtitle">
              {staff.staffno} · {staff.sposition} · Cabang {staff.branchno}
            </p>
          </>
        ) : (
          <h1 className="dashboard-title">Dashboard</h1>
        )}
      </div>

      {errorMessage && <p className="dashboard-error">Error: {errorMessage}</p>}
      {!stats && !errorMessage && <p className="dashboard-loading">Memuat statistik...</p>}

      {stats && (
        <>
          <h2 className="dashboard-section-title">Ringkasan</h2>
          <div className="dashboard-grid">
            <StatCard label="Total Properti" value={stats.total_properti} />
            <StatCard label="Total Klien" value={stats.total_klien} />
            <StatCard label="Total Staff" value={stats.total_staff} />
            <StatCard label="Total Viewing" value={stats.total_viewing} />
            <StatCard
              label="Rata-rata Sewa"
              value={`£${stats.rata_rata_sewa.toLocaleString('en-GB')}`}
              note="per bulan"
            />
          </div>

          <h2 className="dashboard-section-title">Perlu Perhatian</h2>
          <div className="dashboard-grid">
            <StatCard
              label="Properti Tanpa Staff"
              value={stats.properti_tanpa_staff}
              note="belum ada pengelola"
              warning={stats.properti_tanpa_staff > 0}
            />
            <StatCard
              label="Properti Belum Dilihat"
              value={stats.properti_belum_dilihat}
              note="belum pernah di-viewing"
              warning={stats.properti_belum_dilihat > 0}
            />
          </div>
        </>
      )}
    </div>
  )
}
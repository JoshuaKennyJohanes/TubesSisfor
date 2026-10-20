import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import './Report.css'

type StaffRow = {
  staffno: string
  fname: string
  lname: string
  sposition: string
  sex: string
  dob: string
  salary: number
  branchno: string
}

function positionBadge(position: string) {
  const key = position.toLowerCase()
  const cls =
    key === 'manager' ? 'badge-manager'
    : key === 'supervisor' ? 'badge-supervisor'
    : key === 'assistant' ? 'badge-assistant'
    : 'badge-default'
  return <span className={`badge ${cls}`}>{position}</span>
}

export default function StaffSalaryReport() {
  const [minSalary, setMinSalary] = useState(10000)
  const [appliedSalary, setAppliedSalary] = useState(10000)
  const [rows, setRows] = useState<StaffRow[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc('get_staff_by_salary', {
        min_salary: appliedSalary,
      })
      if (error) setErrorMessage(error.message)
      else {
        setErrorMessage('')
        setRows((data ?? []) as StaffRow[])
      }
      setLoading(false)
    }
    loadData()
  }, [appliedSalary])

  return (
    <div className="report-card">
      <div className="report-header">
        <h1 className="report-title">Staff dengan Gaji di Atas Batas</h1>
        <p className="report-desc">Daftar staff yang gajinya melebihi nilai minimum yang kamu tentukan</p>
      </div>

      <div className="report-toolbar">
        <div className="report-field">
          <label className="report-label" htmlFor="min-salary">Gaji minimum</label>
          <input
            id="min-salary"
            className="report-input"
            type="number"
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
          />
        </div>
        <button className="report-btn" onClick={() => setAppliedSalary(minSalary)}>
          Tampilkan
        </button>
      </div>

      {errorMessage && <p className="report-error">{errorMessage}</p>}

      {loading ? (
        <div className="report-empty">Memuat data...</div>
      ) : rows.length === 0 ? (
        <div className="report-empty">Tidak ada staff dengan gaji di atas £{appliedSalary.toLocaleString('en-GB')}.</div>
      ) : (
        <div className="table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>Staff No</th><th>Nama Depan</th><th>Nama Belakang</th><th>Jabatan</th>
                <th>Sex</th><th>DOB</th><th className="cell-num">Gaji</th><th>Cabang</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.staffno}>
                  <td className="cell-id">{r.staffno}</td>
                  <td>{r.fname}</td>
                  <td>{r.lname}</td>
                  <td>{positionBadge(r.sposition)}</td>
                  <td>{r.sex}</td>
                  <td>{r.dob}</td>
                  <td className="cell-num">£{r.salary.toLocaleString('en-GB')}</td>
                  <td>{r.branchno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="report-footer">Jumlah baris: {rows.length}</div>
    </div>
  )
}
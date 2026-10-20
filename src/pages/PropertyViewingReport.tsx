import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import './Report.css'

type Row = {
  propertyno: string
  street: string
  city: string
  clientno: string | null
  viewdate: string | null
  vcomment: string | null
}

function NullCell() {
  return <span className="cell-null">null</span>
}

export default function PropertyViewingReport() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc('get_property_viewing_report')
      if (error) setErrorMessage(error.message)
      else setRows((data ?? []) as Row[])
      setLoading(false)
    }
    loadData()
  }, [])

  return (
    <div className="report-card">
      <div className="report-header">
        <h1 className="report-title">Status Report Properti dan Viewing</h1>
        <p className="report-desc">Semua properti beserta data viewing-nya (LEFT JOIN), termasuk yang belum pernah dilihat</p>
      </div>

      {errorMessage && <p className="report-error">{errorMessage}</p>}

      {loading ? (
        <div className="report-empty">Memuat data...</div>
      ) : rows.length === 0 ? (
        <div className="report-empty">Belum ada data properti.</div>
      ) : (
        <div className="table-wrap">
          <table className="report-table">
            <thead>
              <tr>
                <th>Property No</th><th>Jalan</th><th>Kota</th>
                <th>Client No</th><th>Tanggal Viewing</th><th>Komentar</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.propertyno}-${r.clientno}-${i}`}>
                  <td className="cell-id">{r.propertyno}</td>
                  <td>{r.street}</td>
                  <td>{r.city}</td>
                  <td>{r.clientno ?? <NullCell />}</td>
                  <td>
                    {r.viewdate ? r.viewdate.replace('T', ' ').slice(0, 16) : <NullCell />}
                  </td>
                  <td>{r.vcomment ?? <NullCell />}</td>
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
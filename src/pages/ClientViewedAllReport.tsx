import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import './Report.css'

type Row = {
  clientno: string
  fname: string
  lname: string
}

export default function ClientViewedAllReport() {
  const [rooms, setRooms] = useState(3)
  const [appliedRooms, setAppliedRooms] = useState(3)
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc('get_clients_viewed_all_by_rooms', {
        jumlah_kamar: appliedRooms,
      })
      if (error) setErrorMessage(error.message)
      else {
        setErrorMessage('')
        setRows((data ?? []) as Row[])
      }
      setLoading(false)
    }
    loadData()
  }, [appliedRooms])

  return (
    <div className="report-card">
      <div className="report-header">
        <h1 className="report-title">Klien yang Sudah Melihat Semua Properti</h1>
        <p className="report-desc">Klien yang sudah melakukan viewing ke setiap properti dengan jumlah kamar tertentu</p>
      </div>

      <div className="report-toolbar">
        <div className="report-field">
          <label className="report-label" htmlFor="rooms">Jumlah kamar</label>
          <input
            id="rooms"
            className="report-input"
            type="number"
            min={1}
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </div>
        <button className="report-btn" onClick={() => setAppliedRooms(rooms)}>
          Tampilkan
        </button>
      </div>

      {errorMessage && <p className="report-error">{errorMessage}</p>}

      {loading ? (
        <div className="report-empty">Memuat data...</div>
      ) : rows.length === 0 ? (
        <div className="report-empty">
          Tidak ada klien yang sudah melihat semua properti dengan {appliedRooms} kamar.
        </div>
      ) : (
        <div className="table-wrap">
          <table className="report-table">
            <thead>
              <tr><th>Client No</th><th>Nama Depan</th><th>Nama Belakang</th></tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.clientno}>
                  <td className="cell-id">{r.clientno}</td>
                  <td>{r.fname}</td>
                  <td>{r.lname}</td>
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
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

type Row = {
  clientno: string
  fname: string
  lname: string
}

export default function ClientViewedAllReport() {
  const [rooms, setRooms] = useState(3)
  const [appliedRooms, setAppliedRooms] = useState(3)
  const [rows, setRows] = useState<Row[]>([])
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
    }
    loadData()
  }, [appliedRooms])

  return (
    <div>
      <h1>Klien yang Sudah Melihat Semua Properti</h1>

      <label>
        Jumlah kamar:{' '}
        <input
          type="number"
          min={1}
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />
      </label>{' '}
      <button onClick={() => setAppliedRooms(rooms)}>Tampilkan</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <table border={1} cellPadding={6} style={{ marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>clientNo</th><th>fName</th><th>lName</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.clientno}>
              <td>{r.clientno}</td><td>{r.fname}</td><td>{r.lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p>Tidak ada klien yang memenuhi syarat.</p>}
    </div>
  )
}
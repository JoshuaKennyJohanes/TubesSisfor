import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

type Row = {
  propertyno: string
  street: string
  city: string
  clientno: string | null
  viewdate: string | null
  vcomment: string | null
}

export default function PropertyViewingReport() {
  const [rows, setRows] = useState<Row[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase.rpc('get_property_viewing_report')
      if (error) setErrorMessage(error.message)
      else setRows((data ?? []) as Row[])
    }
    loadData()
  }, [])

  return (
    <div>
      <h1>Status Report Properti dan Viewing</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <table border={1} cellPadding={6} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>propertyNo</th><th>street</th><th>city</th>
            <th>clientNo</th><th>viewDate</th><th>vComment</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.propertyno}</td>
              <td>{r.street}</td>
              <td>{r.city}</td>
              <td>{r.clientno ?? 'null'}</td>
              <td>{r.viewdate ? r.viewdate.replace('T', ' ').slice(0, 16) : 'null'}</td>
              <td>{r.vcomment ?? 'null'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Jumlah baris: {rows.length}</p>
    </div>
  )
}
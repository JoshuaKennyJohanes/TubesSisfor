import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

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

export default function StaffSalaryReport() {
  const [minSalary, setMinSalary] = useState(10000)        // isi kotak input
  const [appliedSalary, setAppliedSalary] = useState(10000) // nilai yang dipakai query
  const [rows, setRows] = useState<StaffRow[]>([])
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
    }
    loadData()
  }, [appliedSalary])

  return (
    <div>
      <h1>Daftar Staff dengan Gaji di Atas Batas</h1>

      <label>
        Gaji minimum:{' '}
        <input
          type="number"
          value={minSalary}
          onChange={(e) => setMinSalary(Number(e.target.value))}
        />
      </label>{' '}
      <button onClick={() => setAppliedSalary(minSalary)}>Tampilkan</button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <table border={1} cellPadding={6} style={{ marginTop: 16, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>staffNo</th><th>fName</th><th>lName</th><th>position</th>
            <th>sex</th><th>DOB</th><th>salary</th><th>branchNo</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.staffno}>
              <td>{r.staffno}</td><td>{r.fname}</td><td>{r.lname}</td>
              <td>{r.sposition}</td><td>{r.sex}</td><td>{r.dob}</td>
              <td>{r.salary}</td><td>{r.branchno}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Jumlah baris: {rows.length}</p>
    </div>
  )
}
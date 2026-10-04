import { useEffect, useState } from 'react'
import { supabase } from './supabase'

type Staff = {
  staffno: string
  fname: string
  lname: string
  sposition: string
  branchno: string
}

export default function Dashboard() {
  const [staff, setStaff] = useState<Staff | null>(null)
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
    loadProfile()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  if (errorMessage) return <p>Error: {errorMessage}</p>
  if (!staff) return <p>Data karyawan tidak ditemukan. Cek apakah akunmu sudah dihubungkan ke tabel Staff.</p>

  return (
    <div>
      <h1>Halo, {staff.fname} {staff.lname}</h1>
      <p>ID: {staff.staffno}</p>
      <p>Jabatan: {staff.sposition}</p>
      <p>Cabang: {staff.branchno}</p>
    </div>
  )
}
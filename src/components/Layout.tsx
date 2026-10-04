
import { NavLink, Outlet } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Layout() {
  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <nav style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #ccc' }}>
        <NavLink to="/" end>Beranda</NavLink>
        <NavLink to="/laporan/staff">Staff & Gaji</NavLink>
        <NavLink to="/laporan/properti-viewing">Status Viewing</NavLink>
        <NavLink to="/laporan/klien-lengkap">Klien Lihat Semua</NavLink>
        <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</button>
      </nav>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  )
}
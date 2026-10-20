import { NavLink, Outlet } from 'react-router-dom'
import { supabase } from '../supabase'
import '../Dashboard.css'

export default function Layout() {
  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="layout-page">
      <nav className="layout-nav">
        <NavLink className="layout-link" to="/" end>Beranda</NavLink>
        <NavLink className="layout-link" to="/laporan/staff">Staff & Gaji</NavLink>
        <NavLink className="layout-link" to="/laporan/properti-viewing">Status Viewing</NavLink>
        <NavLink className="layout-link" to="/laporan/klien-lengkap">Klien Lihat Semua</NavLink>
        <button className="layout-logout" onClick={handleLogout}>Logout</button>
      </nav>
      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}
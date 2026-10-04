import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import ProtectedRoute from './ProtectedRoute'
import Layout from './components/Layout'
import Login from './Login'
import Dashboard from './Dashboard'
import StaffSalaryReport from './pages/StaffSalaryReport'
import PropertyViewingReport from './pages/PropertyViewingReport'
import ClientViewedAllReport from './pages/ClientViewedAllReport'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/laporan/staff" element={<StaffSalaryReport />} />
            <Route path="/laporan/properti-viewing" element={<PropertyViewingReport />} />
            <Route path="/laporan/klien-lengkap" element={<ClientViewedAllReport />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
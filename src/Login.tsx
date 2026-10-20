import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrorMessage('Email atau password salah.')
      setSubmitting(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1 className="login-title">Login ESS</h1>
        <p className="login-subtitle">Masuk dengan akun karyawan kamu</p>

        <div className="login-field">
          <label className="login-label" htmlFor="email">Email</label>
          <input
            id="email"
            className="login-input"
            type="email"
            placeholder="nama@perusahaan.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="password">Password</label>
          <input
            id="password"
            className="login-input"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-button" type="submit" disabled={submitting}>
          {submitting ? 'Masuk...' : 'Masuk'}
        </button>

        {errorMessage && <p className="login-error">{errorMessage}</p>}
      </form>
    </div>
  )
}
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'

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
    <form onSubmit={handleSubmit}>
      <h1>Login ESS</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Masuk...' : 'Masuk'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  )
}
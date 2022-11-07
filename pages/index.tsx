'use client';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Home from '../components/Home'
import { useState } from 'react';
const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  }
  return (
    <div className="container w-full flex flex-col items-center justify-center"
    style={{ padding: '25px 0 25px 0' }}>
      {!session ? (
        <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signInWithEmail}>Sign in</button>
        </div>
      ) : (
        <Home session={session} />
      )}
    </div>
  )
}

export default Login
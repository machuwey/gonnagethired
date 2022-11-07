'use client';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Home from '../components/Home'

const Login = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        
        <Auth 
        supabaseClient={supabase} 
        appearance={{ theme: ThemeSupa }}
         theme="dark" />
      
      
      ) : (
        <Home session={session} />
      )}
    </div>
  )
}

export default Login
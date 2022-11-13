"use client";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Home from "../components/Home";
import { useState } from "react";
import Link from "next/link";
const Login = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }
  return (
    <div
      className="container w-full flex flex-col items-center justify-center h-screen"
      style={{ padding: "25px 0 25px 0" }}
    >
      {!session ? (
        <div className="flex flex-col items-center justify-center space-y-4 w-full">
          <h1 className="text-5xl">
        <span className="gonna">Gonna</span>
        <span className="get">Get</span>
        <span className="hired">Hired</span></h1>
      <style jsx>{`
        .gonna {
          background: linear-gradient(to right, #30cfd0 0%, #330867 200%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .get {
          background: linear-gradient(to right, #fcc846 0%, #ff9053 200%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hired {
          background: linear-gradient(to right, #0DAA58 0%, #0B7475 200%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
          <h1 className="text-2xl">Login</h1>
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

          {/*Or sig up */}
          <div>
            <Link href="/signup">
              <a>Sign up</a>
            </Link>
          </div>
        </div>
      ) : (
        <Home session={session} />
      )}
    </div>
  );
};

export default Login;

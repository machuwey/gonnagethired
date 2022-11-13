import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const supabase = useSupabaseClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.log("error", error);
    } else {
      setEmail("");
      setPassword("");
      setEmailSent(true);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <div className="w-full flex justify-start items-start p-4">
        <Link href="/">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            </a>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center h-screen space-y-4 w-3/4"
      >
        <h1 className="text-3xl">
            <span>Sign Up</span>
        </h1>
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
        <button type="submit" disabled={!email || !password}>
          Sign up
        </button>
        {emailSent && <p>Check your email for the magic link!</p>}
      </form>
      <span>GonnaGetHired</span>
    </div>
  );
}

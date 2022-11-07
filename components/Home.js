'use client';
import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Home({ session }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [company, setCompany] = useState(null);
  const [position, setPosition] = useState(null);
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user]);

  //Async fucnrtion to post data to the database with used id
  const postEntry = async () => {
    const { data, error } = await supabase
      .from("entries")
      .insert([{ user_id: user.id, company: company, position: position }]);
    if (error) console.log("error", error);
    else {
      console.log("success", data);
      fetchEntries();
    }
  };
  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("user_id", user.id);
    if (error) console.log("error", error);
    else {
      console.log("success", data);
      setEntries(data);
    }
  };

  return (
    <div>
      <h1>Welcome to gonna get hired</h1>
      <input
        id="company"
        type="text"
        placeholder="Company"
        value={company || ""}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        id="position"
        type="text"
        placeholder="Position"
        value={position || ""}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button onClick={postEntry}>Submit</button>
      <div>
        {entries &&
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-row justify-between w-1/2 border border-stone-800 rounded-md p-2"
            >
              <div>{entry.company}</div>
              <div>{entry.position}</div>
            </div>
          ))}
      </div>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

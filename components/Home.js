import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "../components/Modal";
export default function Home({ session }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    if (user) {
      fetchEntries();
    }
  }, [user, showModal]);

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
  const deleteEntry = async (id) => {
    const { data, error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id);
    if (error) console.log("error", error);
    else {
      console.log("success", data);
      //Delete from state
      setEntries(entries.filter((entry) => entry.id !== id));
      console.log(id);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4 w-3/4">
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
      <div>
        You have applied to <i>{entries?.length} jobs</i> so far, keep it up!
      </div>
      <div className="flex flex-col w-full space-y-4">
        {entries &&
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-row justify-between  border border-stone-800 rounded-md p-2 items-center w-full"
            >
              <div>{entry.company}</div>
              <div>{entry.position}</div>
              <button onClick={() => deleteEntry(entry.id)}>Delete</button>
            </div>
          ))}
      </div>
      <button onClick={() => setShowModal(true)}>
          New Application
        </button>
      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      
        
        <Modal isVisable={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

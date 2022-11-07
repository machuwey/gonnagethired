import React from "react";
import { useState } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
const Modal = ({ isVisable, onClose }) => {
  const [company, setCompany] = useState(null);
  const [position, setPosition] = useState(null);
  const user = useUser();
  const supabase = useSupabaseClient();
  if (!isVisable) return null;

  const handleModalClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  //Async fucnrtion to post data to the database with used id
  const postEntry = async () => {
    const { data, error } = await supabase
      .from("entries")
      .insert([{ user_id: user.id, company: company, position: position }]);
    if (error) console.log("error", error);
    else {
      console.log("success", data);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      id="wrapper"
      onClick={handleModalClose}
    >
      <div className="bg-neutral-900 flex flex-col w-1/2 h-1/2 rounded-md border border-stone-800 p-4">
        <div className="flex justify-end">
          <button onClick={onClose}>X</button>
        </div>
        <div className="flex flex-col justify-center items-center h-full space-y-4">
          <h1 className="text-2xl">New Application</h1>

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
        </div>
      </div>
    </div>
  );
};

export default Modal;

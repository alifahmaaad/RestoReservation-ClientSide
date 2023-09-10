import { useState } from "react";
import ModalUserDetail from "./ModalUserDetails";
import { useNavigate } from "react-router-dom";

const UserCard = ({ userData }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative w-full rounded-md px-5 py-2 font-serif shadow-md">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold">Full Name : {userData.fullName}</p>
          </div>
          <p>Username : {userData.username}</p>
        </div>
        <div className="flex gap-5">
          <button
            className="font-mono text-[#e52535] hover:drop-shadow-xl"
            onClick={() => navigate("/user/delete/" + userData.id)}
          >
            Delete
          </button>
          <button
            className="font-mono text-[#FFB100] hover:drop-shadow-xl"
            onClick={() => navigate("/user/update/" + userData.id)}
          >
            Edit
          </button>
          <button
            className="font-mono text-[#FFB100] hover:drop-shadow-xl"
            onClick={() => SetIsOpen(!isOpen)}
          >
            See details
          </button>
        </div>
      </div>
      <ModalUserDetail open={isOpen} userData={userData} />
    </div>
  );
};

export default UserCard;

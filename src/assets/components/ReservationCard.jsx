import { useState } from "react";
import ModalReservationDetail from "./ModalReservationDetails";
import Approve from "./StatusReservation/Approve";
import Decline from "./StatusReservation/Decline";
import Pending from "./StatusReservation/Pending";

const ReservationCard = () => {
  const [isOpen, SetIsOpen] = useState(false);
  return (
    <div className="relative w-full rounded-md px-5 py-2 font-serif shadow-md">
      <div className="flex flex-wrap items-center justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold">Restorant Name</p>
            <Decline />
            <Approve />
            <Pending />
          </div>
          <p className="">2000-06-02 121:3231:31231</p>
          <p>Number of guest : 12</p>
        </div>
        <div className="flex gap-5">
          <a className="font-mono text-[#e52535] hover:drop-shadow-lg" href="#">
            Delete
          </a>
          <a className="font-mono text-[#FFB100] hover:drop-shadow-lg" href="#">
            Edit
          </a>
          <button
            className="font-mono text-[#FFB100] hover:drop-shadow-lg"
            onClick={() => SetIsOpen(!isOpen)}
          >
            See details
          </button>
        </div>
      </div>
      <ModalReservationDetail open={isOpen} />
    </div>
  );
};

export default ReservationCard;

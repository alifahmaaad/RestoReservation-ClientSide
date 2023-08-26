import { useState } from "react";
import ModalMenuDetail from "./ModalMenuDetail";

const MenuCard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div>
      {modalOpen && <ModalMenuDetail open={true} func={handleModalOpen} />}
      <button
        className="min-h-32 sm:min-h-h-44 md:min-h-h-56 group relative w-32 hover:cursor-pointer sm:w-44 md:w-56"
        onClick={handleModalOpen}
      >
        <figure className="h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56">
          <img
            className="h-32 w-32 rounded-xl object-cover sm:h-44 sm:w-44 md:h-56 md:w-56"
            src="https://placehold.co/600x400"
            alt=""
            loading="lazy"
          />
        </figure>
        <div className="px-2 font-semibold">
          <p>Food Name</p>
          <p>Rp.50000</p>
        </div>
        <div className="absolute left-0 top-0 flex h-32 w-32 items-center justify-center rounded-xl bg-black bg-opacity-50 opacity-0 duration-700 group-hover:opacity-100 sm:h-44 sm:w-44 md:h-56 md:w-56">
          <p className="font-bold text-[#FFB100]">Menu Detail</p>
        </div>
        <div className="absolute left-0 top-0 -z-10 h-32 w-32 rounded-xl border border-[#FFB100] duration-700 group-hover:-translate-y-3 group-hover:translate-x-3 sm:h-44 sm:w-44 md:h-56 md:w-56" />
      </button>
    </div>
  );
};

export default MenuCard;

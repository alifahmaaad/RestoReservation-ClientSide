import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalMenuDetail = ({ open, func, dataMenu, dataResto }) => {
  const { dataUser } = useSelector((state) => state.dataUserResponseRedux);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  return (
    <div className={open ? "block" : "hidden"}>
      <div className="absolute left-0 top-0 z-50 h-full w-full bg-gray-500 bg-opacity-70 blur-xl" />
      <div className="fixed left-1/2 top-1/2 z-50 flex h-full max-h-[25rem] w-[calc(100vw-5rem)] max-w-[30rem] -translate-x-1/2  -translate-y-1/2 items-center justify-center rounded-xl bg-white">
        <div className="relative h-full w-full px-10 py-5">
          <button
            className="absolute right-0 top-0 m-8 flex items-center font-bold"
            onClick={() => func()}
          >
            X
          </button>
          <div className="absolute left-0 top-0 flex items-center gap-2 p-5 ">
            <p className="text-3xl font-bold">
              RR<b className="text-[#FFB100]">.</b>
            </p>
            <p className="font-mono font-bold">RestoReserve</p>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center py-10 sm:max-w-7xl">
            <p className="py-4 font-serif font-bold ">Menu Details</p>
            <div className="flex h-full w-full flex-col justify-between">
              <div>
                <p>Food Name : {dataMenu.name}</p>
                <p>Price : {dataMenu.price}</p>
                <p>Description : {dataMenu.description}</p>
              </div>
              {(dataUser.role != "Customer" || dataUser == "") &&
                dataUser.role == "Restaurant_Admin" &&
                dataResto.userOwner.id == dataUser.id && (
                  <div className="flex gap-5">
                    <button
                      onClick={() => navigate("/menu/update/" + dataMenu.id)}
                      className="font-mono text-[#FFB100] hover:drop-shadow-lg"
                    >
                      Edit Menu
                    </button>
                    <button
                      onClick={() => navigate("/menu/delete/" + dataMenu.id)}
                      className="font-mono text-[#e52535] hover:drop-shadow-lg"
                    >
                      Delete Menu
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMenuDetail;

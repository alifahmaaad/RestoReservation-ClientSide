import { useEffect } from "react";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";

const MapModal = ({ open, func, dataResto }) => {
  return (
    <div className={open ? "block" : "hidden"}>
      <div className="absolute left-0 top-0 z-50 h-full w-full bg-gray-500 bg-opacity-70 blur-xl" />
      <div className="fixed left-1/2 top-1/2 z-50 flex h-full max-h-[45rem] w-[calc(100vw-5rem)] max-w-[50rem] -translate-x-1/2  -translate-y-1/2 items-center justify-center rounded-xl bg-white">
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
            <p className="font-mono font-bold">RestoReservation</p>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center py-10 sm:max-w-7xl">
            <p className="py-4 font-serif font-bold ">Restaurant Location</p>
            <div className="flex h-full w-full flex-col justify-between gap-3">
              <div>
                <p>Restaurant Name : {dataResto.name}</p>
                <p>Address : {dataResto.address}</p>
              </div>
              <MapContainer
                center={JSON.parse(dataResto.location)}
                zoom={17}
                className="h-[30rem] w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                  center={JSON.parse(dataResto.location)}
                  radius={3}
                  color="red"
                />
                <Marker
                  position={JSON.parse(dataResto.location)}
                  draggable={true}
                />
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;

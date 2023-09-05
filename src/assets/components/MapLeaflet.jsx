import { Circle, MapContainer, Popup, TileLayer } from "react-leaflet";
import MarkerLeaflet from "./MarkerLeaflet";
import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useState } from "react";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MapLeaflet = ({ func }) => {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        func({ lat: latitude, lng: longitude });
      });
    }
  }, []);
  const onClick = useCallback(() => {
    map.setView(location, 17);
  }, [map]);
  return (
    <div className="relative w-full">
      <button
        onClick={onClick}
        className="absolute bottom-6 right-6 z-[100000] rounded border-2 bg-white p-2"
        type="button"
      >
        <FontAwesomeIcon icon={faMapPin} />
      </button>
      {location != null && (
        <MapContainer
          center={location}
          zoom={17}
          className="h-[10rem] w-full"
          ref={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Circle center={location} radius={8} />
          <MarkerLeaflet positionProps={location} func={func} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapLeaflet;

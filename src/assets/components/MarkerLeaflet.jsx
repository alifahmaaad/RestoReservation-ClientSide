import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function MarkerLeaflet({ positionProps, func }) {
  const [position, setPosition] = useState(positionProps);
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const clickedMarkerPosition = { lat, lng };
      setPosition(clickedMarkerPosition);
      func(clickedMarkerPosition);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} draggable={true} />
  );
}
export default MarkerLeaflet;

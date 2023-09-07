import { useEffect, useState } from "react";
import { Marker, Circle, useMapEvents } from "react-leaflet";

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
    <div>
      <Circle center={position} radius={3} color="red" />
      <Marker position={position} draggable={true} />
    </div>
  );
}
export default MarkerLeaflet;

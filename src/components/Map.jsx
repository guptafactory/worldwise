import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
function Map() {
  const [searchParams] = useSearchParams();
  // delhi -> [28.613942, 77.206845]
  const [mapPosition, setMapPosition] = useState([46.2276, 2.2137]);
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  useEffect(
    function () {
      if (mapLat !== null && mapLng !== null) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  return (
    // onClick={() => navigate("form")}
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Markers />
        <ChangeCenter position={mapPosition} />
        <MapClick />
      </MapContainer>
    </div>
  );
}
function Markers() {
  const { cities } = useCities();
  return (
    <>
      {cities.map((city) => (
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            <span>{city.emoji}</span>
            <span>{city.cityName}</span>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
function ChangeCenter({ position }) {
  // In leaflet, map view, etc can only be changed by components. So, a dummy component is created just to change map center
  console.log(position);
  const map = useMap();
  map.setView(position);
  return null;
}
function MapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;

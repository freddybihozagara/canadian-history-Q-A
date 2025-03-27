// src/app/components/LeafletMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Use direct paths to public assets
let DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',  // Assuming the image is in the public/images folder
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap: React.FC = () => {
  return (
    <MapContainer
      center={[56.1304, -106.3468]} // Center coordinates for Canada
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '400px', width: '100%', marginTop: '20px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[45.4215, -75.6972]}> {/* Ottawa */}
        <Popup>Ottawa - Capital of Canada</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;

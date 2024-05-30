import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import React from 'react';

const Geocoder = ({ setStartPoint, setEndPoint }) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any).Geocoder.nominatim();
    const startControl = (L.Control as any).geocoder({
      geocoder,
      placeholder: 'position de départ',
    }).on('markgeocode', (e) => {
      setStartPoint(e.geocode.center);
    }).addTo(map);

    const endControl =(L as any).Control.geocoder({
      geocoder,
      placeholder: 'destination',
    }).on('markgeocode', (e) => {
      setEndPoint(e.geocode.center);
    }).addTo(map);

    return () => {
      map.removeControl(startControl);
      map.removeControl(endControl);
    };
  }, [map, setStartPoint, setEndPoint]);

  return null;
};

const Routing = ({ startPoint, endPoint }) => {
  const map = useMap();

  useEffect(() => {
    if (!startPoint || !endPoint) return;

    const routingControl = (L as any).Routing.control({
      waypoints: [L.latLng(startPoint.lat, startPoint.lng), L.latLng(endPoint.lat, endPoint.lng)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, startPoint, endPoint]);

  return null;
};

const LocateControl = ({ setStartPoint }) => {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });

    const handleLocationFound = (e) => {
      setStartPoint(e.latlng);
      L.marker(e.latlng).addTo(map)
        .bindPopup('Vous etes ici').openPopup();
    };

    map.on('locationfound', handleLocationFound);

    return () => {
      map.off('locationfound', handleLocationFound);
    };
  };

  return (
    <button
      onClick={handleLocate}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        padding: '10px',
        backgroundColor: 'white',
        border: 'none',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        cursor: 'pointer'
      }}
    >
      Utiliser ma position 
    </button>
  );
};

export function MyItineraire() {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

  return (
    <div className="w-full h-full bg-gray-200" style={{ position: 'relative' }}>
      <MapContainer className='w-screen h-[80vh]' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <Geocoder setStartPoint={setStartPoint} setEndPoint={setEndPoint} />
        <Routing startPoint={startPoint} endPoint={endPoint} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocateControl setStartPoint={setStartPoint} />
      </MapContainer>
    </div>
  );
}

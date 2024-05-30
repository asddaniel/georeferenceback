import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import React from 'react';

const Geocoder = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any).Geocoder.nominatim();
    const control = (L.Control as any).geocoder(null).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [map]);

  return null;
}

const Routing = () => {
  const map = useMap();

  useEffect(() => {
    const routingControl = (L as any).Routing.control({
      waypoints: [
        L.latLng(51.505, -0.09),
        L.latLng(51.51, -0.1)
      ],
      routeWhileDragging: true
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
}

const Controller = () => {
  const provider = new OpenStreetMapProvider();
  const searchControl = GeoSearchControl({ provider: provider, style: 'button' });
  const map:any = useMap();

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, [map, searchControl]);

  return null;
}

const LocateControl = ({ onLocate }) => {
  return (
    <button
      onClick={onLocate}
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
      Trouver ma position
    </button>
  );
}

const MapComponent = () => {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });

    const handleLocationFound = (e) => {
      const radius = e.accuracy;
      L.marker(e.latlng).addTo(map)
        .bindPopup(`vous etes dans un rayon de ${radius} metres de ce point`).openPopup();
      L.circle(e.latlng, radius).addTo(map);
    }

    map.on('locationfound', handleLocationFound);

    return () => {
      map.off('locationfound', handleLocationFound);
    };
  }

  return <LocateControl onLocate={handleLocate} />;
}

export function Carte() {
  return (
    <div className="w-full h-full bg-gray-200" style={{ position: 'relative' }}>
      <MapContainer className='w-screen h-[80vh]' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <Controller />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapComponent />
      </MapContainer>
    </div>
  )
}

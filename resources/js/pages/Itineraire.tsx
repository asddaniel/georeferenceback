import { useEffect, useMemo, useState } from 'react';
// import { Marker, CircleMarker, Tooltip, Circle, Polygon, Rectangle } from 'leaflet';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
// import { useMap } from 'react-leaflet/hooks'
import {  Popup, Marker, useMapEvents  } from 'react-leaflet';
import "leaflet/dist/leaflet.css"
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet'; 
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import React from 'react';


const Geocoder = ({ setStartPoint, setEndPoint }:any) => {
  const map = useMap();

  useEffect(() => {
    const geocoder = (L.Control as any).Geocoder.nominatim();
    const startControl = (L.Control as any).geocoder({
      geocoder,
      placeholder: 'Start location',
    }).on('markgeocode', (e:any) => {
      console.log("markgeocode")
      setStartPoint(e.geocode.center);
    }).addTo(map);

    const endControl = (L.Control as any).geocoder({
      geocoder,
      placeholder: 'End location',
    }).on('markgeocode',(e:any) => {
      setEndPoint(e.geocode.center);
    }).addTo(map);

    return () => {
      map.removeControl(startControl);
      map.removeControl(endControl);
    };
  }, [map, setStartPoint, setEndPoint]);

  return null;
};

const Routing = ({ startPoint, endPoint }:any) => {
  const map = useMap();

  useEffect(() => {
    if (!startPoint || !endPoint) return;

    const routingControl = ((L as any).Routing).control({
      waypoints: [L.latLng(startPoint.lat, startPoint.lng), L.latLng(endPoint.lat, endPoint.lng)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, startPoint, endPoint]);

  return null;
};

const Controller = ()=>{

  
  const provider = new OpenStreetMapProvider();

  const searchControl:any =  GeoSearchControl({provider: provider, style: 'button',});
  
  const map:any = useMap();
    useEffect(() => {
      
      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, []);

  return null;
}



export function Itineraire(){

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
    return (
        <div className="w-full h-full bg-gray-200">
            <MapContainer   className='w-screen h-[80vh]' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      {/* <Controller /> */}
      <Geocoder setStartPoint={setStartPoint} setEndPoint={setEndPoint} />
      <Routing startPoint={startPoint} endPoint={endPoint} />
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {/* <Marker position={[51.505, -0.09]}>
    <Popup>
      Localisation d'un lieu
    </Popup>
  </Marker> */}
</MapContainer>
        </div>
      )
}
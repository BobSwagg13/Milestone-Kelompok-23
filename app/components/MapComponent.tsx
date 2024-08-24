'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const pinpointIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Define Place interface
interface Place {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  reward?: number;
}

const MapComponent = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [center, setCenter] = useState<[number, number]>([-6.9175, 107.6191]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/places');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Place[] = await response.json();
        console.log('Places data:', data);
        setPlaces(data);

        if (data.length > 0) {
          const latitudes = data.map(place => place.latitude);
          const longitudes = data.map(place => place.longitude);
          const avgLatitude = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
          const avgLongitude = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
          setCenter([avgLatitude, avgLongitude]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places:', error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCenter([latitude, longitude]);
        },
        (error) => {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (loading) {
    return <div>Loading map data...</div>;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {places.map((place, index) => (
          <Marker key={index} position={[place.latitude, place.longitude]} icon={pinpointIcon}>
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation} icon={pinpointIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

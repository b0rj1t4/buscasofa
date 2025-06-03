import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types';
import './Emergency.css';
import { fetchZipCode } from '@/apis/zipCode';

const Emergency = ({ stations }) => {
  const [nearbyStations, setNearbyStations] = useState([]);
  const [showPostalForm, setShowPostalForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [place, setPlace] = useState('');

  // 1. Obtener ubicación del usuario
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      setShowPostalForm(true);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error al obtener ubicación: ${err.message}`);
        setShowPostalForm(true);
        setLoading(false);
      }
    );
  }, []);

  // 2. Calcular distancias cuando tengamos ubicación
  useEffect(() => {
    if (!userLocation || !stations?.length) return;

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    try {
      const stationsWithDistance = stations.map((station) => {
        const stationLat = parseFloat(station.Latitud.replace(',', '.'));
        const stationLng = parseFloat(
          station['Longitud (WGS84)'].replace(',', '.')
        );
        return {
          ...station,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            stationLat,
            stationLng
          ),
        };
      });

      // Ordenar por distancia (más cercana primero)
      const sortedStations = stationsWithDistance
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10); // Limitar a las 10 más cercanas
      setNearbyStations(sortedStations);
    } catch (err) {
      console.error('Error al procesar las gasolineras:', err);
      setError('Error al procesar las gasolineras');
    } finally {
      setLoading(false);
    }
  }, [userLocation, stations]);

  // 3. Manejar envío del formulario de código postal si no hay ubicación
  const handlePostalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coords = await fetchZipCode(postalCode);
      console.log('Coordenadas obtenidas:', coords.places[0]);

      if (!coords) throw new Error('Código postal no reconocido');

      setPlace({
        ...coords.places[0],
      });

      setUserLocation({
        lat: coords.places[0].latitude,
        lng: coords.places[0].longitude,
        source: 'postal',
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gas-stations-list">
      {error && <div className="error">{error}</div>}

      {showPostalForm && !userLocation && (
        <div className="postal-form">
          <h3>Ingresa tu código postal</h3>
          <form onSubmit={handlePostalSubmit}>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Ej: 28001"
              pattern="\d{5}"
              required
            />
            <button type="submit">Buscar</button>
          </form>
          <p className="hint">Usaremos esto para aproximar tu ubicación</p>
        </div>
      )}

      {place && (
        <div className="postal-info">
          <h3>Ubicación aproximada por código postal</h3>
          <p>
            <strong>Ciudad:</strong> {place['place name']},{' '}
            <strong>Provincia:</strong> {place['state']}
          </p>
        </div>
      )}

      {userLocation && (
        <>
          <h2>Gasolineras más cercanas</h2>
          <div className="stations-container">
            {nearbyStations.map((station, index) => (
              <div
                key={station.IDEESS || index}
                className={`station-card ${station.isOpen ? 'open' : 'closed'}`}
              >
                <h3>{station.Rótulo}</h3>
                <p>
                  <strong>Distancia:</strong> {station.distance.toFixed(2)} km
                </p>
                <p>
                  <strong>Dirección:</strong> {station.Dirección},{' '}
                  {station.Municipio}
                </p>
                <p>
                  <strong>Horario:</strong> {station.Horario || '24H'}
                </p>
                {station['Precio Gasoleo A'] && (
                  <p>
                    <strong>Gasóleo A:</strong> {station['Precio Gasoleo A']} €
                  </p>
                )}
                {station['Precio Gasolina 95 E5'] && (
                  <p>
                    <strong>Gasolina 95 E5:</strong>{' '}
                    {station['Precio Gasolina 95 E5']} €
                  </p>
                )}
                {station['Precio Gasolina 98 E5'] && (
                  <p>
                    <strong>Gasolina 98 E5:</strong>{' '}
                    {station['Precio Gasolina 98 E5']} €
                  </p>
                )}
              </div>
            ))}
          </div>

          {nearbyStations.length === 0 && (
            <div>No se encontraron gasolineras cercanas</div>
          )}

          {loading && <div className="loading">Buscando gasolineras...</div>}
        </>
      )}
    </div>
  );
};

export default Emergency;

import React from 'react';

import './Perfil.css';

function Perfil({ user }) {
  return (
    <div className="perfil-container">
      <h1>Perfil de Usuario</h1>
      {user ? (
        <div className="perfil-info">
          <p>
            <strong>Nombre:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Teléfono:</strong> {user.phone}
          </p>
          <p>
            <strong>Dirección:</strong> {user.address}
          </p>
        </div>
      ) : (
        <p>No hay información de usuario disponible.</p>
      )}
    </div>
  );
}
export default Perfil;

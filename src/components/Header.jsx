import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

import './Header.css';

function Header({ user }) {
  const handleLogout = () => {
    // Lógica de cierre de sesión
    console.log('Cerrar sesión');
  };

  return (
    <header>
      <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>
          <img src={logo} alt="Logo" style={{ height: '3em' }} />
        </Link>

        <Link className="buscador" to="/lista" style={{ marginRight: '1rem' }}>
          Buscador
        </Link>
        <Link className="mapa" to="/mapa" style={{ marginRight: '1rem' }}>
          Mapa
        </Link>
        <Link className="about" to="/about">
          Acerca de nosotros
        </Link>

        <Link
          className="emergency"
          to="/emergency"
          style={{ marginLeft: '1rem' }}
        >
          Emergencia
        </Link>

        <span
          style={{ marginLeft: 'auto', marginRight: '1rem', float: 'right' }}
        >
          {!user && (
            <>
              <Link
                className="login"
                to="/login"
                style={{ marginRight: '1rem' }}
              >
                Login
              </Link>
              <Link className="registro" to="/registro">
                Registro
              </Link>
            </>
          )}
          {user && (
            <>
              <span style={{ marginRight: '1rem' }}>
                Bienvenido, <Link to="/perfil">{user}</Link>
              </span>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          )}
        </span>
      </nav>
    </header>
  );
}

export default Header;

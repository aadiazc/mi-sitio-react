import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`${process.env.REACT_APP_API_URL}profile/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(() => setUserData({ error: 'No se pudo cargar el perfil' }));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h3>🎉 Bienvenido al Dashboard</h3>
        {userData ? (
          userData.error ? (
            <p>❌ {userData.error}</p>
          ) : (
            <p>👤 Usuario: <strong>{userData.username}</strong></p>
          )
        ) : (
          <p>Cargando datos...</p>
        )}
        <button
          className="btn btn-secondary mt-3"
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
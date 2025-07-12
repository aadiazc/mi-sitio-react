import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login'; // 👈 Importa el nuevo componente

function App() {
  return (
     <>
      <h1>Hola, este es mi nuevo cambio</h1>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
    </>

  );
}

export default App;
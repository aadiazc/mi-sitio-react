import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // URL directa al backend
  const API_URL = 'http://backend-env.eba-i3asj5tf.us-east-1.elasticbeanstalk.com/api/register/';

  const handleRegister = async () => {
    if (!username || !password) {
      setMessage('⚠️ Por favor completa todos los campos');
      return;
    }

    console.log('URL de registro:', API_URL); // Verifica que esté bien

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        setMessage('❌ Respuesta inesperada del servidor');
        return;
      }

      if (res.ok) {
        setMessage('✅ Usuario registrado exitosamente');
        setTimeout(() => navigate('/'), 1500); // Redirige al login
      } else {
        setMessage(data.error || '❌ Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMessage('⚠️ No se pudo conectar al servidor');
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        className="card p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="mb-4 text-center">Registro de Usuario</h3>
        <input
          className="form-control mb-3"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-success w-100" onClick={handleRegister}>
          Registrarse
        </button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <p className="mt-3 text-center">
          ¿Ya tienes cuenta? <a href="/">Inicia sesión</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;
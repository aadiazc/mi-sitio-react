// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // URL directa al backend en Elastic Beanstalk
  const API_URL = 'http://backend-env.eba-i3asj5tf.us-east-1.elasticbeanstalk.com/api/login/';

  const handleLogin = async () => {
    console.log('URL de login:', API_URL); // Verifica que la URL esté bien

    if (!username || !password) {
      setMessage('⚠️ Por favor completa todos los campos');
      return;
    }

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

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Sesión iniciada correctamente');
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage(data.error || '❌ Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en el login:', error);
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
        <h3 className="mb-4 text-center">Iniciar Sesión</h3>
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
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Entrar
        </button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <p className="mt-3 text-center">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
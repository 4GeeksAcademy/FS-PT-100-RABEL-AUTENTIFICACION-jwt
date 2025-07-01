import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import useServices from "../services/useServices";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const data = await useServices.login(formData);
    if (data && data.token) {
      sessionStorage.setItem("token", data.token);
      navigate("/private"); 
    } else {
      setError("Credenciales inválidas");
    }
  };
  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
        <p className="mt-3 text-center">
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí </Link>
        </p>
      </form>
    </div>
  );
};
export default Login;
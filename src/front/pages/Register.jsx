import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userServices from "../services/useServices";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const { email, password } = formData;
    try {
      const data = await userServices.register({ email, password });
      if (data) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError("Error al registrar el usuario");
    }
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Registrarse
        </button>
      </form>
      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};
export default Register;
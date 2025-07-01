import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
 
const PrivateRoutes = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      return;
    }
 
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-token`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => {
        console.error("Error verificando token:", err);
        setIsAuth(false);
      });
  }, []);
  if (isAuth === null) return <p>Cargando</p>;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
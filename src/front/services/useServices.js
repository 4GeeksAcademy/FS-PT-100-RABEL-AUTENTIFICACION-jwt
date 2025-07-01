const backendUrl = import.meta.env.VITE_BACKEND_URL;
const userServices = {};

userServices.register = async (formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw new Error("No se pudo registrar el usuario");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userServices.login = async (formData) => {
  try {
    const resp = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw new Error("Credenciales incorrectas");
    const data = await resp.json();
    sessionStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userServices.getUserInfo = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/private`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw new Error("No autorizado");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

userServices.verifyToken = async () => {
  try {
    const resp = await fetch(`${backendUrl}/api/verify-token`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    if (!resp.ok) throw new Error("Token inválido");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default userServices;
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!sessionStorage.getItem("token");
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand mb-0 h1">Autentificación JWT</span>
      {isAuth && (
        <button className="btn btn-danger ms-2" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};
export default Navbar;
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div className="container-fluid p-3">

          <div className="navbar-brand">
            <Link to={"/"} className="link-logo">
              CEP Register
            </Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/"} className="link">
                Home
              </Link>

               <Link to={"/novo-registro"} className="link">
                Novo Registro
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

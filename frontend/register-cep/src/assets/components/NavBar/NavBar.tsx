import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
        <div className="container-fluid p-3">
          <a className="navbar-brand" href="#">
            CEP Register
          </a>
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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
              <a className="nav-link" href="#">
                Endereços
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

import "./Form.css";

export default function Form() {
  return (
    <div className="container-form mb-5">
      <div className="content-form col-md-7 col-lg-8 p-5">
        <form className="needs-validation">
          <div className="row g-3 mb-3">
            <div className="col-sm-3 mb-4">
              <label htmlFor="firstName" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value=""
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col">
              <button className="btn btn-outline-primary">Buscar</button>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-sm-4">
              <label htmlFor="firstName" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                value=""
                required
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-sm-4">
              <label htmlFor="lastName" className="form-label">
                CPF
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                value=""
                required
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>
          
          <hr className="divider mt-5" />
          <section className="content-api mt-5">
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  Logradouro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-4">
                <label htmlFor="lastName" className="form-label">
                  Bairro
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-sm-3">
                <label htmlFor="firstName" className="form-label">
                  Cidade
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-sm-4">
                <label htmlFor="lastName" className="form-label">
                  Estado
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  value=""
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
          </section>

          <div className="row">
            <div className="col-sm-3 mt-5">
              <button className="btn btn-secondary">Cancelar</button>
              <button className="btn btn-success mx-4">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

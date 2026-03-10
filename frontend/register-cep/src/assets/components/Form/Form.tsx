import "./Form.css";

export default function Form() {
  return (
    <div className="col-md-7 col-lg-8">
      <h4 className="mb-3">Billing address</h4>
      <form className="needs-validation">
        <div className="row g-3 mb-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              First name
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
          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder=""
              value=""
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              First name
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
          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder=""
              value=""
              required
            />
            <div className="invalid-feedback">Valid last name is required.</div>
          </div>
        </div>

        <button className="w-100 btn btn-primary btn-lg" type="submit">
          Continue to checkout
        </button>
      </form>
    </div>
  );
}

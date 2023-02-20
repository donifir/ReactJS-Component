import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createSuplier,
  getSuplier,
  suplierSelectors,
} from "../../features/suplierSlice";

export default function SuplierCreate() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataStatus = useSelector((state) => state.suplier.dataStatus);
  const dataError = useSelector((state) => state.suplier.dataError);

  const formHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("suplier_name", name);
    formData.append("supplier_address", address);
    formData.append("supplier_phone_number", phone);

    dispatch(createSuplier(formData));
  };

  useEffect(() => {
    if (dataError) {
      setError(dataError);
    }
  }, [dataError]);

  useEffect(() => {
    if (dataStatus === "fulfilled") {
      navigate("/dashboard/suplier");
    }
  }, [dataStatus]);

  const body = (
    <form onSubmit={formHandler}>
      <div className="form-group mb-3">
        <label htmlFor="name">Suplier Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className="text-danger">{error.suplier_name}</span>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="name">Suplier Address</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <span className="text-danger">{error.supplier_address}</span>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="name">Suplier Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <span className="text-danger">{error.supplier_phone_number}</span>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Suplier List</h5>
        <div className="card-tools">
          <a className="btn btn-primary btn-sm" href="#" role="button">
            Create
          </a>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
      <div className="card-body">{body}</div>
      <div className="card-footer">footer</div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  getSuplier, suplierSelectors, updateSuplier } from "../../features/suplierSlice";

export default function SuplierEdit() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState([]);


  const dispatch = useDispatch();
  const  {id} = useParams();
  const navigate = useNavigate();

  const dataStatus = useSelector((state) => state.suplier.dataStatus);
  const dataError = useSelector((state) => state.suplier.dataErrorUpdate);

  const suplier = useSelector((state)=>suplierSelectors.selectById(state,id)); //cara ambil data dari store



  const formHandler=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('suplier_name',name)
    formData.append('supplier_address',address)
    formData.append('supplier_phone_number',phone)

    dispatch(updateSuplier({formData, id}))
  }

  useEffect(() => {
    dispatch(getSuplier())
  }, [dispatch])
  
  useEffect(() => {
    if (suplier) {
      setName(suplier.suplier_name);
      setAddress(suplier.supplier_address);
      setPhone(suplier.supplier_phone_number);
    }
  }, [suplier])
  
  useEffect(() => {
    if (dataStatus==="fulfilled") {
      navigate('/dashboard/suplier')
    }
    if (dataStatus==="rejected") {
      setError(dataError)
    }
  }, [dataStatus, dataError])
  

  const body = (
    <form onSubmit={formHandler}>
      <div className="form-group mb-3">
        <label htmlFor="name">Suplier Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
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
          onChange={(e)=>setAddress(e.target.value)}
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
          onChange={(e)=>setPhone(e.target.value)}
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
      {/* {console.log(dataError)} */}
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

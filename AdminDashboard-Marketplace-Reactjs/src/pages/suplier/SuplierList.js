import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSuplier, getSuplier, suplierSelectors } from "../../features/suplierSlice";

export default function SuplierList() {
  const dispatch = useDispatch();
  const suplier = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const dataError = useSelector((state) => state.suplier.dataError);

  useEffect(() => {
    dispatch(getSuplier());
  }, [dispatch]);

  const body = (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Suplier Name</th>
          <th scope="col">Address</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {suplier.map((data, index) => (
          <tr key={data.id}>
            <td scope="col">{index + 1}</td>
            <td scope="col">{data.suplier_name}</td>
            <td scope="col">{data.supplier_address}</td>
            <td scope="col">{data.supplier_phone_number}</td>
            <td scope="col">
              <Link type="button" className="btn btn-primary btn-sm" to={`/dashboard/suplier/${data.id}/edit`}>
                Edit
              </Link>
              <button type="button" className="btn btn-sm btn-danger" onClick={()=>dispatch(deleteSuplier(data.id))}>Primary</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Suplier List</h5>
        <div className="card-tools">
          <Link
            className="btn btn-primary btn-sm"
            to={"/dashboard/suplier/create"}
            role="button"
          >
            Create
          </Link>
          <button
            type="button"
            className="btn btn-tool"
            data-card-widget="collapse"
          >
            <i className="fas fa-minus" />
          </button>
        </div>
      </div>
      <div className="card-body">{dataError ? dataError : body}</div>
      <div className="card-footer">footer</div>
    </div>
  );
}

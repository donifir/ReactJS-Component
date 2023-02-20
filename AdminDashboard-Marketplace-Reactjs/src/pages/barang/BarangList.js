import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { barangSelectors, deleteBarang, getBarang } from "../../features/barangSlice";

export default function BarangList() {
  const dispatch = useDispatch();
  const barangs = useSelector(barangSelectors.selectAll); //cara ambil data dari store

  useEffect(() => {
    dispatch(getBarang());
  }, [dispatch]);

  const body = (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Nama Barang</th>
          <th scope="col">Stok</th>
          <th scope="col">Harga</th>
          <th scope="col">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {barangs.map((data, index) => (
          <tr key={data.id}>
            <th scope="row">{index + 1}</th>
            <td>{data.nama_barang}</td>
            <td>{data.stok}</td>
            <td>{data.harga}</td>
            <td>
              <Link type="button" to={`/dashboard/barang/${data.id}/edit`} class="btn btn-primary btn-sm">
                Primary
              </Link>
              <button type="button" class=" btn-sm btn btn-danger" onClick={()=>dispatch(deleteBarang(data.id))}>Primary</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Barang List</h5>
        <div className="card-tools">
          <Link
            className="btn btn-primary btn-sm"
            to={"/dashboard/barang/create"}
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
      <div className="card-body">{body}</div>
      <div className="card-footer">footer</div>
    </div>
  );
}

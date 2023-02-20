import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  barangSelectors,
  createBarang,
  getBarang,
} from "../../features/barangSlice";
import { getSuplier, suplierSelectors } from "../../features/suplierSlice";

export default function BarangCreate() {
  const [namaBarang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [suplier, setSuplier] = useState("");
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const supliers = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const dataStatus = useSelector((state) => state.barang.dataStatus);
  const dataError = useSelector((state) => state.barang.dataError);

  const imageHandler = (e) => {
    setGambar(e.target.files[0]);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", namaBarang);
    formData.append("suplier", suplier);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);
    formData.append("gambar", gambar);

    await dispatch(createBarang(formData));
  };

  useEffect(() => {
    if (dataStatus === "fulfilled") {
      navigate("/dashboard/barang");
    }
    if (dataStatus === "rejected") {
      setError(dataError);
    }
  }, [dataStatus, dataError]);

  useEffect(() => {
    dispatch(getSuplier());
  }, [dispatch]);

  const body = (
    <form onSubmit={formHandler}>
      <div className="form-group">
        <label htmlFor="namaBarang">Nama Barang</label>
        <input
          type="text"
          className="form-control"
          id="namaBarang"
          value={namaBarang}
          onChange={(e) => setNamaBarang(e.target.value)}
        />
        <span className="text-danger">{error.nama_barang}</span>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Suplier</label>
        <select
          className="form-control"
          aria-label="Default select example"
          defaultValue={suplier}
          onChange={(e) => setSuplier(e.target.value)}
        >
          <option>Open this select menu</option>
          {supliers.map((data) => (
            <option key={data.id} value={data.id}>
              {data.suplier_name}
            </option>
          ))}
        </select>
        <span className="text-danger">{error.suplier}</span>
      </div>

      <div className="form-group">
        <label htmlFor="harga">Harga</label>
        <input
          type="text"
          className="form-control"
          id="harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />
        <span className="text-danger">{error.harga}</span>
      </div>

      <div className="form-group">
        <label htmlFor="stok">stok</label>
        <input
          type="text"
          className="form-control"
          id="stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />
        <span className="text-danger">{error.stok}</span>
      </div>

      <div className="form-group">
        <label htmlFor="stok">keterangan</label>
        <input
          type="text"
          className="form-control"
          id="keterangan"
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
        />
        <span className="text-danger">{error.keterangan}</span>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlFile1">Example file input</label>
        <input
          type="file"
          className="form-control-file"
          id="exampleFormControlFile1"
          onChange={imageHandler}
        />
        <span className="text-danger">{error.gambar}</span>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <div className="card">
      {/* {console.log(supliers)} */}
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

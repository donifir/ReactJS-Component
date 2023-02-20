import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createBarang } from "../../features/barangSlice";
import { suplierSelectors, getSuplier } from "../../features/suplierSlice";

export default function BarangCreate() {
  const dispatch = useDispatch();
  const [namaBarang, setNamaBarang] = useState("");
  const [suplier, setSuplier] = useState("");
  const [harga, setHarga] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [stok, setStok] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const supliers = useSelector(suplierSelectors.selectAll); //cara ambil data dari store
  const createBarangStatus = useSelector(
    (state) => state.barang.createBarangStatus
  );
  const errorBarang = useSelector((state) => state.barang.createError);

  useEffect(() => {
    if (createBarangStatus === "succeeded") {
      navigate("/barang");
    }
  }, [createBarangStatus]);

  useEffect(() => {
    dispatch(getSuplier());
  }, [dispatch]);

  useEffect(() => {
    if (errorBarang) {
      setError(errorBarang);
    }
  }, [errorBarang, dispatch]);

  const imageHandler = (event) => {
    setGambar(event.target.files[0]);
  };

  const createBarangForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_barang", namaBarang);
    formData.append("harga", harga);
    formData.append("stok", stok);
    formData.append("keterangan", keterangan);
    formData.append("gambar", gambar);
    formData.append("suplier", suplier);

    await dispatch(createBarang(formData));
  };

  return (
    <div>
      {console.log(error, "create status")}
      <div>
        <Link to="/barang" className="btn btn-primary btn-small float-end mb-3">
          Back
        </Link>
      </div>

      <form className="pt-5" onSubmit={createBarangForm}>
        <div className="mb-3">
          <label htmlFor="namaBarang" className="form-label">
            Nama Barang
          </label>
          <input
            type="text"
            className="form-control"
            value={namaBarang}
            onChange={(event) => setNamaBarang(event.target.value)}
          />
          <span className="text-danger">{error.nama_barang}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="suplier" className="form-label">
            Suplier
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            defaultValue=""
            onChange={(event) => setSuplier(event.target.value)}
          >
            <option>Open this select menu</option>
            {supliers.map((suplier) => (
              //   <ListItem key={number.toString()} value={number} />
              <option key={suplier.id} value={suplier.id}>
                {suplier.nama_suplier}
              </option>
            ))}
          </select>
          <span className="text-danger">{error.suplier}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="harga" className="form-label">
            Harga
          </label>
          <input
            type="text"
            className="form-control"
            value={harga}
            onChange={(event) => setHarga(event.target.value)}
          />
          <span className="text-danger">{error.harga}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="stok" className="form-label">
            Stok
          </label>
          <input
            type="text"
            className="form-control"
            value={stok}
            onChange={(event) => setStok(event.target.value)}
          />
          <span className="text-danger">{error.stok}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="keterangan" className="form-label">
            Keterangan
          </label>
          <input
            type="text"
            className="form-control"
            value={keterangan}
            onChange={(event) => setKeterangan(event.target.value)}
          />
          <span className="text-danger">{error.keterangan}</span>
        </div>

        <div className="mb-3">
          <label htmlFor="gambar" className="form-label">
            Gambar
          </label>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile01"
              onChange={imageHandler}
            />
          </div>
          <span className="text-danger">{error.gambar}</span>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

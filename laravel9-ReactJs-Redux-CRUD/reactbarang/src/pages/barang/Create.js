import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postBarang, resetStore } from "../../actions/barangAction";
import { getListSuplier } from "../../actions/suplierAction";

export default function Create() {
  const [nama_barang, setNamaBarang] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [suplier_id, setSuplierId] = useState("");
  const [error, setError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postBarangResult, postBarangError } = useSelector(
    (state) => state.BarangReducer
  );
  const { getListSuplierResult } = useSelector((state) => state.SuplierReducer);

  const imageHandler = (event) => {
    setGambar(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("nama_barang", nama_barang);
  formData.append("harga", harga);
  formData.append("stok", stok);
  formData.append("keterangan", keterangan);
  formData.append("gambar", gambar);
  formData.append("suplier_id", suplier_id);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      postBarang(
        formData
        // nama_barang: nama_barang,
        // harga: harga,
        // stok: stok,
        // keterangan: keterangan,
        // gambar: gambar,
        // suplier_id: suplier_id,
      )
    );
  };

  useEffect(() => {
    dispatch(getListSuplier());
  }, [dispatch, getListSuplier]);

  useEffect(() => {
    if (postBarangResult) {
      setNamaBarang("");
      setHarga("");
      setStok("");
      setKeterangan("");
      setGambar("");
      setSuplierId("");

      navigate("/barang");

      Swal.fire("Success", "That thing is still around?", "success");
    }
    if (postBarangError) {
      setError(postBarangError);
    }
  }, [postBarangError, postBarangResult]);

  return (
    <Container className="pt-4">
      <Col xs={7}>
        <Card>
          <Card.Header>
            <h3>
              Create barang
              <Link className="btn btn-primary float-end" to="/barang">
                Back
              </Link>
            </h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={(event) => handleSubmit(event)}>
              <Form.Group className="mb-3" controlId="namaBarang">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  // value={nama_barang}
                  onChange={(event) => setNamaBarang(event.target.value)}
                />
                <span className="text-danger">{error.nama_barang}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="harga">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                  type="number"
                  value={harga}
                  onChange={(event) => setHarga(event.target.value)}
                />
                <span className="text-danger">{error.harga}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="stok">
                <Form.Label>Stok</Form.Label>
                <Form.Control
                  type="text"
                  value={stok}
                  onChange={(event) => setStok(event.target.value)}
                />
                <span className="text-danger">{error.stok}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="keterangan">
                <Form.Label>Keterangan</Form.Label>
                <Form.Control
                  type="text"
                  value={keterangan}
                  onChange={(event) => setKeterangan(event.target.value)}
                />
                <span className="text-danger">{error.keterangan}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="suplier">
                <Form.Label>Suplier</Form.Label>
              
                {/* <Form.Control
                  type="text"
                  value={suplier_id}
                  onChange={(event) => setSuplierId(event.target.value)}
                /> */}
                <Form.Select aria-label="Default select example"
                value={suplier_id}
                onChange={(event) => setSuplierId(event.target.value)}
                >
                  <option>Open this select menu</option>
                  {getListSuplierResult?
                  getListSuplierResult.map((data) => (
                    <option key={data.id} value={data.id}>{data.nama_suplier}</option>
                  ))
                  :
                  <option>Error</option>
                }
                  
                  
                </Form.Select>
                <span className="text-danger">{error.suplier_id}</span>
              </Form.Group>

              <Form.Group className="mb-3" controlId="gambar">
                <Form.Label>Gambar</Form.Label>
                <Form.Control
                  type="file"
                  onChange={imageHandler}
                  //   value={gambar}
                  //  onChange={(event) => setGambar(event.target.value)}
                />

                <span className="text-danger">{error.gambar}</span>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

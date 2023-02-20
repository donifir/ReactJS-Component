import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PostDataSuplier,getDetailSuplier,PostEditSuplier } from "../../actions/suplierAction";

export default function Edit() {
  const [nama_suplier, setNamaSuplier] = useState("");
  const [alamat_suplier, setAlamatSuplier] = useState("");
  const [telp_suplier, setTelpSuplier] = useState("");
  const [error, setError] = useState("");

  const { getDetailSuplierResult,PostEditSuplierResult,PostEditSuplierError } = useSelector(
    (state) => state.SuplierReducer
  );

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = () => {
    // console.log("1. kirm id");
    dispatch(
      getDetailSuplier({
        id,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      PostEditSuplier({
        id:id,
        nama_suplier: nama_suplier,
        alamat_suplier: alamat_suplier,
        telp_suplier: telp_suplier,
      })
    );
  };

  useEffect(() => {
    getData();
     if (getDetailSuplierResult) {
      setNamaSuplier(getDetailSuplierResult.nama_suplier);
      setAlamatSuplier(getDetailSuplierResult.alamat_suplier);
      setTelpSuplier(getDetailSuplierResult.telp_suplier);
    }
  }, []);
  
  useEffect(() => {
     if (getDetailSuplierResult) {
      setNamaSuplier(getDetailSuplierResult.nama_suplier);
      setAlamatSuplier(getDetailSuplierResult.alamat_suplier);
      setTelpSuplier(getDetailSuplierResult.telp_suplier);
    }
  }, [getDetailSuplierResult]);

  useEffect(() => {
    if (PostEditSuplierError) {
      setError(PostEditSuplierError)
    }
    if (PostEditSuplierResult) {
      setNamaSuplier("");
      setAlamatSuplier("");
      setTelpSuplier("");
      Swal.fire(
        'Success?',
        'That thing is still around?',
        'success'
      )
      navigate("/suplier")
    }
  }, [PostEditSuplierResult, PostEditSuplierError]);


  return (
    <Container className="pt-4">
      <Row>
        <Col xs={9}>
          <Card>
            <Card.Header>
              <h3>
                Edit Data Suplier{" "}
                <Link className="btn btn-primary float-end" to="/suplier">
                  Back
                </Link>
              </h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group className="mb-3" controlId="nama">
                  <Form.Label>Nama Suplier</Form.Label>
                  <Form.Control
                    type="text"
                    value={nama_suplier}
                    onChange={(event) => setNamaSuplier(event.target.value)}
                  />
                  <span className="text-danger">{error.nama_suplier}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="alamat">
                  <Form.Label>Alamat Suplier</Form.Label>
                  <Form.Control
                    type="text"
                    value={alamat_suplier}
                    onChange={(event) => setAlamatSuplier(event.target.value)}
                  />
                  <span className="text-danger">{error.alamat_suplier}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="telp">
                  <Form.Label>Telp Suplier</Form.Label>
                  <Form.Control
                    type="text"
                    value={telp_suplier}
                    onChange={(event) => setTelpSuplier(event.target.value)}
                  />
                  <span className="text-danger">{error.telp_suplier}</span>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

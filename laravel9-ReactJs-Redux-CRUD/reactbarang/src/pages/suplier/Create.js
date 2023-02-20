import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PostDataSuplier } from "../../actions/suplierAction";

export default function Create() {
  const [nama_suplier, setNamaSuplier] = useState("");
  const [alamat_suplier, setAlamatSuplier] = useState("");
  const [telp_suplier, setTelpSuplier] = useState("");
  const [error, setError] = useState("");

  const {
    PostDataSuplierLoading,
    PostDataSuplierResult,
    PostDataSuplierError,
  } = useSelector((state) => state.SuplierReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      PostDataSuplier({
        nama_suplier: nama_suplier,
        alamat_suplier: alamat_suplier,
        telp_suplier: telp_suplier,
      })
    );
  };

  useEffect(() => {
    if (PostDataSuplierResult) {
      setNamaSuplier("");
      setAlamatSuplier("");
      setTelpSuplier("");
      navigate("/suplier");
    }
    if (PostDataSuplierError) {
      setError(PostDataSuplierError);
    }
  }, [PostDataSuplierResult, PostDataSuplierError]);

  return (
    <Container className="pt-4">
      <Row>
        <Col xs={9}>
          <Card>
            <Card.Header>
              <h3>
                Create Data Suplier{" "}
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

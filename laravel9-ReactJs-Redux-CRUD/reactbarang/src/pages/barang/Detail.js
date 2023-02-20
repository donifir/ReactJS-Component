import React, { useEffect } from "react";
import { Container, Col, Card, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getDetailBarang,
  resetStore,
  removeBarang,
} from "../../actions/barangAction";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    getDetailBarangLoading,
    getDetailBarangResult,
    getDetailBarangError,
    removeBarangResult,
  } = useSelector((state) => state.BarangReducer);

  const getData = () => {
    dispatch(getDetailBarang({ id }));
  };

  useEffect(() => {
    getData();
  }, [dispatch, id]);

  useEffect(() => {
    if (removeBarangResult) {
      Swal.fire("Berhasil?", "Data berhasil dihapus?", "Success");
    }
  }, [removeBarangResult, dispatch]);

  return (
    <Container className="pt-4">
      <Col xs={9}>
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
            {getDetailBarangLoading ? (
              <Row className="justify-content-md-center">
                <Col
                  xs
                  lg="1"
                  className="container d-flex align-items-center justify-content-center"
                >
                  <Spinner animation="border" variant="primary" />
                </Col>
              </Row>
            ) : getDetailBarangResult ? (
              <Row>
                {/* <Col xs={4}> */}
                <Col xs lg="4">
                  <Card style={{ width: "14rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Header>
                      <Card.Img
                        variant="top"
                        src={`http://localhost:8000/image/${getDetailBarangResult.gambar}`}
                      />
                    </Card.Header>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <Card.Header>
                      <Card.Title>Card Title</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col xs={4}>Nama Barang</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.nama_barang}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Harga</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.harga}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Stok</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.stok}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Keterangan</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.keterangan}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Nama Suplier</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.nama_suplier}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Alamat Suplier</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.alamat_suplier}</Col>
                      </Row>
                      <Row>
                        <Col xs={4}>Telp Suplier</Col>
                        <Col xs={1}>:</Col>
                        <Col>{getDetailBarangResult.telp_suplier}</Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <Row>
                        <Col className="d-flex align-items-center justify-content-center">
                          <Link
                            className="btn btn-sm btn-primary"
                            to={`/product/${getDetailBarangResult.id}/edit`}
                            onClick={() => dispatch(resetStore())}
                          >
                            Edit
                          </Link>
                        </Col>

                        <Col className="d-flex align-items-center justify-content-center">
                          <Link
                            className="btn btn-sm btn-danger"
                            to="/barang"
                            onClick={() =>
                              dispatch(removeBarang(getDetailBarangResult.id))
                            }
                          >
                            Delete
                          </Link>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            ) : (
              "Error"
            )}
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

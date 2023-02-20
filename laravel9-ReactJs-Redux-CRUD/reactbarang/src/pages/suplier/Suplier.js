import React, { useEffect } from "react";
import { Row, Container, Col, Card, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getListSuplier, resetStore, deleteDataSuplier } from "../../actions/suplierAction";

export default function Suplier() {
  const { getListSuplierLoading, getListSuplierResult, getListSuplierError,deleteDataSuplierResult } =
    useSelector((state) => state.SuplierReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListSuplier());
    if (deleteDataSuplierResult) {
      Swal.fire(
        'Success?',
        'Suplier Berhasil di delete',
        'Success'
      )
    }

  }, [dispatch, getListSuplier,deleteDataSuplierResult]);

  return (
    <Container className="pt-4">
      <Row>
        <Col xs={9}>
          <Card>
            <Card.Header>
              <h3>
                Data Suplier{" "}
                <Link
                  className="btn btn-primary float-end"
                  to="/suplier/create"
                  onClick={() => dispatch(resetStore())}
                >
                  Create
                </Link>
              </h3>
            </Card.Header>
            <Card.Body>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {getListSuplierLoading ? (
                    <tr>
                      <td colSpan={5}>
                        <div className="container d-flex align-items-center justify-content-center">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      </td>
                    </tr>
                  ) : getListSuplierResult ? (
                    getListSuplierResult.map((suplier, index) => {
                      var numb = index + 1;
                      return (
                        <tr key={suplier.id}>
                          <td>{numb++}</td>
                          <td>{suplier.nama_suplier}</td>
                          <td>{suplier.alamat_suplier}</td>
                          <td>{suplier.telp_suplier}</td>
                          <td>
                            <Link
                              className="btn btn-sm btn-primary"
                              to={`/suplier/${suplier.id}`}
                              onClick={() => dispatch(resetStore())}
                            >
                              Edit
                            </Link>
                            <Link
                              className="btn btn-sm btn-danger"
                              to={"/suplier"}
                              onClick={() => dispatch(deleteDataSuplier(suplier.id))}
                            >
                              Delete
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5}>
                        <div className="container d-flex align-items-center justify-content-center">
                          {getListSuplierError}{" "}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useEffect } from "react";
import { Container, Card, Table, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getListBarang, resetStore } from "../../actions/barangAction";

export default function Barang() {
  const { getListBarangLoading, getListBarangResult, getListBarangError } =
    useSelector((state) => state.BarangReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListBarang());
  }, [dispatch, getListBarang]);

  return (
    <Container className="pt-4">
      <Card style={{ width: "50rem" }}>
        <Card.Header>
          <h3>
            Data List Barang{" "}
            <Link
              className="btn btn-primary float-end"
              to="/create"
              onClick={() => dispatch(resetStore())}
            >
              Create
            </Link>{" "}
          </h3>
        </Card.Header>
        <Card.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Barang</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getListBarangLoading ? (
                <tr>
                  <td colSpan={5}>
                    <div className="container d-flex align-items-center justify-content-center">
                      <Spinner animation="border" variant="primary" />
                    </div>
                  </td>
                </tr>
              ) : getListBarangResult ? (
                getListBarangResult.map((barang, index) => {
                  var numb = index + 1;
                  return (
                    <tr key={barang.id}>
                      <td>{numb++}</td>
                      <td>{barang.nama_barang}</td>
                      <td>{barang.stok}</td>
                      <td>{barang.harga}</td>
                      <td>
                        {/* <Link  className="btn btn-success btn-sm"  onClick={()=>dispatch(getDetailBarang(barang))} to={`/product/${barang.id}`}>
                        Detail
                      </Link> */}
                        <Link
                          className="btn btn-success btn-sm"
                          to={`/product/${barang.id}`}
                        >
                          Detail
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5}>
                    <div className="container d-flex align-items-center justify-content-center">
                      {getListBarangError}{" "}
                    </div>
                  </td>
                </tr>
              )}
              {/* <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  {" "}
                  <Link className="btn btn-success btn-sm" to="/about">
                    Detail
                  </Link>
                </td>
              </tr> */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

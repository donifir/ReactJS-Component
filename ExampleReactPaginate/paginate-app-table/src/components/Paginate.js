import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

export default function Paginate(props) {
  const [currentItems, setCurrentItems] = useState([]); //ubah jadi array
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  //tambahan
  const { data } = props;
  const itemsPerPage = 6; //tambahab ->

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]); //tambahan data

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    {console.log(itemOffset,'adalah page count')}
      <div className="container pt-4">
        <div className="card">
          <div className="card-header">Data User</div>
          <div className="card-body">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((datasTable,index) => {
                  return (
                    <tr>
                      <td>{itemOffset+index+1}</td>
                      <td>{datasTable.id}</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      {/* <Items currentItems={currentItems} /> */}
      <div className="d-flex justify-content-center">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}//baera nomor yang ditampilkan
        //   pageCount={pageCount}//kalo full tidak dibatasi
          pageCount="10"//paginate dibatasi sampai 10 saja
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          //tambahan dibawah
          containerClassName="pagination"
          pageLinkClassName="page-link"
          previousClassName="page-link"
          nextLinkClassName="page-link"
          activeClassName="active"
        //   breakClassName="page-item"
        
        />
      </div>
    </>
  );
}

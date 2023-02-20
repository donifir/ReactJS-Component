import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../App.css";

export default function Image(props) {
  const { data } = props;
  const itemsPerPage = 6; //tambahab ->

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]); //->tambahan (data)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <div className="images">
        {currentItems.map((image) => {
          return (
            <div className="image">
              <img src={image.url} alt={image.tittle} />
            </div>
          );
        })}
      </div>
      {/* tambahan */}
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3} //data yang ditampilkan sebelum ....
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        //tambahan dibawah
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousClassName="page-num"
        nextLinkClassName="page-num"
        activeClassName="active"
      />
    </>
  );
}

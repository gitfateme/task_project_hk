import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/PaginatedItems.css";

export default function PaginatedItems(props) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <div key={index} className="border p-4 ">
              <p>
                Item #{item.id}:<br /> Name:{"  "}
                {item.name} <br /> Comment:{"  "}
                {item.body}
                <br /> postId: {"  "}
                {item.postId}
              </p>
              <a href="/">Edit</a>
            </div>
          ))}
      </>
    );
  }

  useEffect(() => {
    const endOffset = itemOffset + props.itemsPerPage;
    setCurrentItems(props.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.data.length / props.itemsPerPage));
  }, [itemOffset, props.itemsPerPage, props.data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % props.data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="pagination-items">
          <Items currentItems={currentItems} />
        </div>
        <div className="react-paginate">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/PaginationSection.css";

function PaginationSection(props) {
  const items = props.items;
  console.log(items.length);

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

  function PaginatedItems({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
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

  if (props.items) {
    return <PaginatedItems itemsPerPage={4} />;
  } else {
    return "loading";
  }
}

export default PaginationSection;

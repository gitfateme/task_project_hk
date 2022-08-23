import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/PaginatedItems.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function PaginatedItems(props) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState([]);

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
    console.log("");
  };

  const openToggle = (e, item) => {
    e.preventDefault();
    setModal(!modal);
    setModalItem(item);
  };

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
              <a href="/" onClick={(event) => openToggle(event, item)}>
                Edit
              </a>
            </div>
          ))}
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Edit Comment with id #{modalItem.id}
            </ModalHeader>
            <ModalBody>
              <form>
                <div className="mb-3">
                  <label htmlFor="nameTextArea" className="form-label">
                    Name:
                  </label>
                  <textarea
                    className="form-control"
                    id="nameTextArea"
                    defaultValue={modalItem.name}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="commentTextArea" className="form-label">
                    Comment:
                  </label>
                  <textarea
                    className="form-control"
                    id="commentTextArea"
                    rows={5}
                    defaultValue={modalItem.body}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Confirm edit
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
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

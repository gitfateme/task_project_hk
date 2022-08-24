import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./styles/PaginatedItems.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { editComment } from "./app/newSlice";

export default function PaginatedItems(props) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalItem, setModalItem] = useState([]);

  const data = useSelector((state) => state.new.data);
  const dispatch = useDispatch();

  const toggle = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  const openToggle = (e, item) => {
    e.preventDefault();
    setModal(!modal);
    setModalItem(item);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const newName = e.target[0].value;
    const newEmail = e.target[1].value;
    const newComment = e.target[2].value;
    const index = data.indexOf(modalItem);
    dispatch(
      editComment({
        index: index,
        id: modalItem.id,
        name: newName,
        body: newComment,
        email: newEmail,
        postId: modalItem.postId,
      })
    );
    setModal(!modal);
  };

  function Items({ currentItems }) {
    return (
      <>
        <div className="row">
          {currentItems &&
            currentItems.map((item, index) => (
              <div key={index} className="border p-4 col-md-6">
                <p>
                  <strong>Item #{item.id}:</strong>
                  <br /> <strong>Name:</strong>
                  {"  "}
                  <a href={`mailto:${item.email.toLowerCase()}`}>
                    {item.name}
                  </a>{" "}
                  <br /> <strong>Comment:</strong>
                  {"  "}
                  {item.body}
                  <br />
                  <strong> postId: </strong>
                  {"  "}
                  {item.postId}
                </p>
                <a href="/" onClick={(event) => openToggle(event, item)}>
                  Edit
                </a>
              </div>
            ))}
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              Edit Comment with id #{modalItem.id}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleEdit}>
                <div className="mb-3">
                  <label htmlFor="nameTextArea" className="form-label">
                    Name:
                  </label>
                  <textarea
                    className="form-control"
                    id="nameTextArea"
                    defaultValue={modalItem.name}
                    rows={1}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    defaultValue={modalItem.email}
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
                <ModalFooter>
                  <Input
                    className="btn btn-primary w-50"
                    type="submit"
                    defaultValue={"Confirm edit"}
                  ></Input>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </>
    );
  }

  useEffect(() => {
    const endOffset = itemOffset + props.itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / props.itemsPerPage));
  }, [itemOffset, props.itemsPerPage, data]);

  useEffect(() => {
    setItemOffset(0);
  }, [data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * props.itemsPerPage) % data.length;
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
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
  );
}

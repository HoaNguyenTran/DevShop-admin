import React from "react";
import Modal from "../../../components/UI/Modal";

export const DeleteCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    buttons,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      buttons={buttons}
    >
      <h5>Expanded</h5>
      {expandedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
      <h5>Checked</h5>
      {checkedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
    </Modal>
  );
};

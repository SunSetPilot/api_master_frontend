import React, { useEffect, useState } from 'react';
import {
  Modal,
} from 'antd';



function DeleteModal(props) {
  const { title, value, isModalOpen } = props;

  function handleOk() {
    props.onOk()
  }

  function handleCancel() {
    props.onCancel()
  }

  return (
    <Modal
      title={title}
      value={value}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
     <p>Are you sure you want to <span style={{ 'color': 'red' }}>delete</span> {title} {value} ?</p>
    </Modal>
  )
}

export default DeleteModal;
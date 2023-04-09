import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteProduct } from "../features/product/productSlice";
const { confirm } = Modal;

const showDeleteConfirm = (props: any) => {
  confirm({
    title: "Are you sure delete this content?",
    icon: <ExclamationCircleFilled />,

    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      props.handleDelete(props.id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });

  return <div></div>;
};

export default showDeleteConfirm;

import { useState, useEffect } from "react";
import { Button, Form, Input, Radio, Modal, InputNumber, Divider } from "antd";
import {
  updateProduct,
  reset,
  getProducts,
} from "../features/product/productSlice";
import { useSelector, useDispatch } from "react-redux";
import productService from "../features/product/productService";
import { IProduct } from "../models/Product";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const UpdateModal = (props: any) => {
  const dispatch = useDispatch<any>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.title);
  const [product, setProduct] = useState<IProduct>({
    createdAt: "",
    productName: "",
    productCategory: "",
    productAmount: 0,
    amountUnit: "",
    companyName: "",
    id: "",
  });

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  useEffect(() => {
    if (props.data) {
      setProduct(props.data);
    }
    return () => {};
  }, [props.data]);

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    productService.updateProduct(product);
    setTimeout(() => {
      props.setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.setOpen(false);
  };

  const handleInput = ({ name, value }: { name: string; value: any }) => {
    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAmount = (value: number) => {
    setProduct((previous) => ({
      ...previous,
      productAmount: value,
    }));
  };
  return (
    <Modal
      title={"Update " + modalText}
      open={props.open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="Save"
    >
      <p></p>
      <br />
      {/* <p>{props.data.productName ? props.data.productName : "abc"}</p> */}
      {props.data ? (
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{ layout: "horizental" }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Product Name">
            <Input
              placeholder="input placeholder"
              value={product.productName}
              name="productName"
              onChange={({ target }) => handleInput(target)}
            />
          </Form.Item>
          <Form.Item label="Product Category">
            <Input
              placeholder="input placeholder"
              name="productCategory"
              value={product.productCategory}
              onChange={({ target }) => handleInput(target)}
            />
          </Form.Item>
          <Form.Item label="Produt Amount">
            <InputNumber
              value={product.productAmount}
              name="productAmount"
              onChange={(value: number | null) => handleAmount(value || 0)}
            />
          </Form.Item>
          <Form.Item label="Amount Unit">
            <Input
              placeholder="input placeholder"
              name="amountUnit"
              value={product.amountUnit}
              onChange={({ target }) => handleInput(target)}
            />
          </Form.Item>
          <Form.Item label="Company Name">
            <Input
              placeholder="input placeholder"
              name="companyName"
              value={product.companyName}
              onChange={({ target }) => handleInput(target)}
            />
          </Form.Item>
          {/* <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item> */}
        </Form>
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default UpdateModal;

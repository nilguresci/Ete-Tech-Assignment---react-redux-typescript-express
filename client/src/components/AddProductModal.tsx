import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputNumber, Modal, Form } from "antd";
import { IProduct } from "../models/Product";
import productService from "../features/product/productService";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const AddProductModal = (props: any) => {
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const [product, setProduct] = useState<IProduct>({
    createdAt: "",
    productName: "",
    productCategory: "",
    productAmount: 0,
    amountUnit: "",
    companyName: "",
    id: "",
  });

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

  const handleOk = () => {
    productService.addProduct(product);
    setTimeout(() => {
      props.setOpen(false);
      setProduct({
        createdAt: "",
        productName: "",
        productCategory: "",
        productAmount: 0,
        amountUnit: "",
        companyName: "",
        id: "",
      });
    }, 2000);
  };

  const handleCancel = () => {
    props.setOpen(false);
    setProduct({
      createdAt: "",
      productName: "",
      productCategory: "",
      productAmount: 0,
      amountUnit: "",
      companyName: "",
      id: "",
    });
  };
  return (
    <Modal
      title="Add new product"
      open={props.open}
      onOk={handleOk}
      okText="Add"
      onCancel={handleCancel}
    >
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
    </Modal>
  );
};

export default AddProductModal;

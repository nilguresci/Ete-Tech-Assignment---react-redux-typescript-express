import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, InputNumber, Modal, Form, Button } from "antd";
import { ICompany } from "../models/Company";
import companyService from "../features/company/companyService";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const AddCompanyModal = (props: any) => {
  const dispatch = useDispatch<any>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(props.title);
  const [company, setCompany] = useState<ICompany>({
    createdAt: "",
    companyName: "",
    companyLegalNumber: 0,
    incorporationCountry: "",
    website: "",
    id: "",
  });

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const handleOk = () => {
    companyService.addCompany(company);

    setTimeout(() => {
      props.setOpen(false);
      setCompany({
        createdAt: "",
        companyName: "",
        companyLegalNumber: 0,
        incorporationCountry: "",
        website: "",
        id: "",
      });
    }, 2000);
  };

  const handleCancel = () => {
    props.setOpen(false);
    setCompany({
      createdAt: "",
      companyName: "",
      companyLegalNumber: 0,
      incorporationCountry: "",
      website: "",
      id: "",
    });
  };

  const handleInput = ({ name, value }: { name: string; value: any }) => {
    setCompany((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCompanyLegalNumber = (value: number) => {
    setCompany((previous) => ({
      ...previous,
      companyLegalNumber: value,
    }));
  };
  return (
    <Modal
      title="Add new company"
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
        <Form.Item label="Company Name">
          <Input
            placeholder="input placeholder"
            value={company.companyName}
            name="companyName"
            onChange={({ target }) => handleInput(target)}
          />
        </Form.Item>
        <Form.Item label="Company Legal Number">
          <InputNumber
            value={company.companyLegalNumber}
            name="companyLegalNumber"
            onChange={(value: number | null) =>
              handleCompanyLegalNumber(value || 0)
            }
          />
        </Form.Item>
        <Form.Item label="Incorporation Country">
          <Input
            placeholder="input placeholder"
            name="incorporationCountry"
            value={company.incorporationCountry}
            onChange={({ target }) => handleInput(target)}
          />
        </Form.Item>
        <Form.Item label="Website">
          <Input
            placeholder="input placeholder"
            name="website"
            value={company.website}
            onChange={({ target }) => handleInput(target)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCompanyModal;

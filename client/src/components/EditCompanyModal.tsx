import { useState, useEffect } from "react";
import { Button, Form, Input, Radio, Modal, InputNumber, Divider } from "antd";
import {
  updateCompany,
  reset,
  getCompanies,
} from "../features/company/companySlice";
import { useSelector, useDispatch } from "react-redux";
import companyService from "../features/company/companyService";
import { ICompany } from "../models/Company";

type LayoutType = Parameters<typeof Form>[0]["layout"];

const EditCompanyModal = (props: any) => {
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

  useEffect(() => {
    if (props.data) {
      setCompany(props.data);
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
    companyService.updateCompany(company).then(() => {
      dispatch(getCompanies);
    });
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
      ) : (
        <div></div>
      )}
    </Modal>
  );
};

export default EditCompanyModal;

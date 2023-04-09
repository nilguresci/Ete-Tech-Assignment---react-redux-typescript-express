import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCompany,
  getCompanies,
  reset,
} from "../features/company/companySlice";
import TableComp from "../components/TableComponent";
import { Breadcrumb, Space, Layout, Menu, theme, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { ICompany, ICompanyList } from "../models/Company";
import companyService from "../features/company/companyService";
import EditCompanyModal from "../components//EditCompanyModal";
import AddCompanyModal from "../components/AddCompanyModal";
import { AiOutlineDelete } from "react-icons/ai";
import showDeleteConfirm from "../components/DeleteModal";

interface DataType {
  id: string;
  companyName: string;
  companyLegalNumber: number;
  incorporationCountry: string;
  website: string;
}

const Company = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState<string>();
  const [modalData, setModalData] = useState<ICompany>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const companies: ICompany[] = useSelector(
    (state: any) => state.company.companies
  );

  useEffect(() => {
    dispatch(getCompanies());
  }, [open, isModalOpen]);

  const showModal = (id: string) => {
    companyService.getOneCompany(id).then((res) => {
      setModalData(res);
    });
    setModalId(id);
    setOpen(true);
  };

  const showAddCompanyModal = () => {
    setIsModalOpen(true);
  };

  const callDeleteModal = (id: string) => {
    return showDeleteConfirm({ id, handleDelete });
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCompany(id)).then(() => {
      dispatch(getCompanies());
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      filters: companies.map((x) => ({
        text: x.companyName,
        value: x.companyName,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.companyName.startsWith(value),
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      width: "25%",
    },
    {
      title: "Company Legal Number",
      dataIndex: "companyLegalNumber",
      sorter: (a, b) => a.companyLegalNumber - b.companyLegalNumber,
    },
    {
      title: "Incorporation Country",
      dataIndex: "incorporationCountry",
      filters: companies.map((x) => ({
        text: x.incorporationCountry,
        value: x.incorporationCountry,
      })),
      onFilter: (value: string, record) =>
        record.incorporationCountry.startsWith(value),
      filterSearch: true,
      width: "25%",
      responsive: ["md"],
    },
    {
      title: "Website",
      dataIndex: "website",
      filters: companies.map((x) => ({
        text: x.website,
        value: x.website,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.website.startsWith(value),
      width: "25%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a type="link" onClick={() => showModal(record.id)}>
            Edit
          </a>
          <a type="link" onClick={() => callDeleteModal(record.id)}>
            <AiOutlineDelete></AiOutlineDelete>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Content className="site-layout" style={{ padding: "0 20px" }}>
      <Breadcrumb style={{ margin: "10px 0", color: "white" }}>
        <Breadcrumb.Item>
          <Button type="link" onClick={showAddCompanyModal}>
            Add company
          </Button>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 14,
          minHeight: 380,
          background: colorBgContainer,
          height: "480px",
        }}
      >
        <TableComp
          columns={columns}
          data={companies}
          paginationSize={8}
        ></TableComp>
        <EditCompanyModal
          open={open}
          setOpen={setOpen}
          modalId={modalId}
          data={modalData}
          setModalData={setModalData}
          title="company"
        />

        <AddCompanyModal open={isModalOpen} setOpen={setIsModalOpen} />
      </div>
    </Content>
  );
};

export default Company;

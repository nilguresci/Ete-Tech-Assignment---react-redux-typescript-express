import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
  reset,
} from "../features/product/productSlice";
import TableComp from "../components/TableComponent";
import { Breadcrumb, Space, Layout, Menu, theme, Button, Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { IProduct, IProductList } from "../models/Product";
import UpdateModal from "../components/EditProductModal";
import productService from "../features/product/productService";
import { AiOutlineDelete } from "react-icons/ai";
import showDeleteConfirm from "../components/DeleteModal";
import AddProductModal from "../components/AddProductModal";
interface DataType {
  id: string;
  productName: string;
  productAmount: number;
  productCategory: string;
  amountUnit: string;
  companyName: string;
}

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { Header, Content, Footer } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState<string>();
  const [modalData, setModalData] = useState<IProduct>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id: string) => {
    productService.getOneProduct(id).then((res) => {
      setModalData(res);
    });
    setModalId(id);
    setOpen(true);
  };

  const callDeleteModal = (id: string) => {
    return showDeleteConfirm({ id, handleDelete });
  };

  const products: IProduct[] = useSelector(
    (state: any) => state.product.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [open, isModalOpen]);

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id)).then(() => {
      dispatch(getProducts());
    });
  };

  const showAddProductModal = () => {
    setIsModalOpen(true);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Product Name",
      dataIndex: "productName",
      filters: products.map((x) => ({
        text: x.productName,
        value: x.productName,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.productName.startsWith(value),
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      width: "25%",
      responsive: ["md"],
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      filters: products.map((x) => ({
        text: x.productCategory,
        value: x.productCategory,
      })),
      onFilter: (value: string, record) =>
        record.productCategory.startsWith(value),
      filterSearch: true,
      width: "20%",
      responsive: ["md"],
    },
    {
      title: "Product Amount",
      dataIndex: "productAmount",
      sorter: (a, b) => a.productAmount - b.productAmount,
    },
    {
      title: "Amount Unit",
      dataIndex: "amountUnit",
      filters: products.map((x) => ({
        text: x.amountUnit,
        value: x.amountUnit,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.amountUnit.startsWith(value),
      width: "20%",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      filters: products.map((x) => ({
        text: x.companyName,
        value: x.companyName,
      })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: string, record) => record.companyName.startsWith(value),
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
      width: "20%",
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
          {/* <Button onClick={() => callDeleteModal(record.id)} type="dashed">
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <Content className="site-layout" style={{ padding: "0 20px" }}>
      <Breadcrumb style={{ margin: "10px 0", color: "white" }}>
        {/* <Breadcrumb.Item>Products</Breadcrumb.Item> */}
        <Breadcrumb.Item>
          <Button type="link" onClick={showAddProductModal}>
            Add product
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
          data={products}
          paginationSize={8}
        ></TableComp>
      </div>
      <UpdateModal
        open={open}
        setOpen={setOpen}
        modalId={modalId}
        data={modalData}
        setModalData={setModalData}
        title="product"
      />

      <AddProductModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Content>
  );
};

export default Product;

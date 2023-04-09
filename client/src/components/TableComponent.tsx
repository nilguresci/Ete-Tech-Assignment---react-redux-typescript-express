import React from "react";
import { Space, Table, Tag } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { IProductList, IProduct } from "../models/Product";
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const TableComponent = (props: any) => {
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={props.columns}
      dataSource={props.data}
      onChange={onChange}
      size="middle"
      pagination={{
        defaultPageSize: props.paginationSize,
        // showSizeChanger: true,
        // pageSizeOptions: ["10", "20", "30"],
      }}
    />
  );
};

export default TableComponent;

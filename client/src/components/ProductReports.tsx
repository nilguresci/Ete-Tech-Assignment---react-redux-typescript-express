import {
  Breadcrumb,
  Layout,
  theme,
  Descriptions,
  Row,
  Col,
  Card,
  List,
  Statistic,
  Tabs,
} from "antd";
import type { TabsProps } from "antd";
import { IUserInitialInfo } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../features/product/productSlice";
import productService from "../features/product/productService";
import { IProduct } from "../models/Product";

const ProductReports = () => {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    productService.getLastFiveProduct().then((res) => {
      setProducts(res);
    });
  }, []);

  return (
    <Content className="site-layout" style={{ padding: " 0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>5 products with the least amount left</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          height: "800px",
        }}
      >
        <Row gutter={[32, 32]} style={{ height: "750px" }}>
          <Col>
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={products}
              renderItem={(item) => (
                <List.Item>
                  <Card title={item.productName} style={{ textAlign: "start" }}>
                    <Descriptions column={2}>
                      <Card
                        bordered={false}
                        style={{
                          borderRadius: "10px",
                          borderColor: "whitesmoke",
                          border: "1px solid #b7eb8f",
                          //backgroundColor: "whitesmoke",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <Statistic
                          title="Amount"
                          value={item.productAmount}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                        />
                      </Card>

                      <Descriptions.Item label="Category" span={9}>
                        {item.productCategory}
                      </Descriptions.Item>
                      <Descriptions.Item label="Unit">
                        {item.amountUnit}
                      </Descriptions.Item>
                      <Descriptions.Item label="Company">
                        {item.companyName}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default ProductReports;

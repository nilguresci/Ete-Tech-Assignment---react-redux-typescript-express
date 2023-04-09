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
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductReports from "../components/ProductReports";
import CompanyReports from "../components/CompanyReports";
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Product Reports`,
    children: <ProductReports></ProductReports>,
  },
  {
    key: "3",
    label: `Company Reports`,
    children: <CompanyReports></CompanyReports>,
  },
];

const Home = () => {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const loggedInUser: IUserInitialInfo = useSelector(
    (state: any) => state.auth.user
  );

  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if (!loggedInUser || loggedInUser === null) {
      setLoggedIn(false);
      navigate("/login");
    }
  }, [loggedInUser]);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const data2 = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];

  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      onChange={onChange}
      style={{ marginLeft: "1rem" }}
    />

    // <Content className="site-layout" style={{ padding: " 0 50px" }}>
    //   {/* <Breadcrumb style={{ margin: "16px 0" }}>
    //     <Breadcrumb.Item>Products</Breadcrumb.Item>
    //   </Breadcrumb> */}
    //   <div
    //     style={{
    //       padding: 24,
    //       minHeight: 380,
    //       background: colorBgContainer,
    //       height: "800px",
    //     }}
    //   >
    //     <Row
    //       gutter={[32, 32]}
    //       style={{ height: "750px", border: "1px solid red" }}
    //     >
    //       <Col>
    //         product amount ı en az kalmış on ürün
    //         <List
    //           grid={{ gutter: 16, column: 2 }}
    //           dataSource={data}
    //           renderItem={(item) => (
    //             <List.Item>
    //               <Card title="Product Name">
    //                 <Descriptions>
    //                   {/* <Descriptions.Item>
    //                       <Statistic title="Amount" value={1128} />
    //                     </Descriptions.Item> */}
    //                   <Card bordered={false}>
    //                     <Statistic
    //                       title="Amount"
    //                       value={11.28}
    //                       precision={2}
    //                       valueStyle={{ color: "#3f8600" }}
    //                       suffix="%"
    //                     />
    //                   </Card>
    //                   {/* <Descriptions.Item label="Product Name" span={9}>
    //                     Zhou Maomao
    //                   </Descriptions.Item> */}

    //                   <Descriptions.Item label="Category" span={9}>
    //                     Hangzhou
    //                   </Descriptions.Item>
    //                   <Descriptions.Item label="Unit">empty</Descriptions.Item>
    //                   <Descriptions.Item label="Company">
    //                     No. 18, Wantang
    //                   </Descriptions.Item>
    //                 </Descriptions>
    //               </Card>
    //             </List.Item>
    //           )}
    //         />
    //       </Col>
    //     </Row>
    //   </div>
    // </Content>
  );
};

export default Home;

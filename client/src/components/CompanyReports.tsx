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
import companyService from "../features/company/companyService";
import { ICompany } from "../models/Company";

const CompanyReports = () => {
  const { Header, Content, Footer } = Layout;
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const [companies, setComapnies] = useState<ICompany[]>([]);

  useEffect(() => {
    companyService.getLastFiveCompany().then((res) => {
      setComapnies(res);
    });
  }, []);

  return (
    <Content className="site-layout" style={{ padding: " 0 50px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Lastly added 5 companies</Breadcrumb.Item>
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
            <div></div>

            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={companies}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    title={item.companyName}
                    style={{ textAlign: "justify" }}
                  >
                    <Descriptions>
                      <Descriptions.Item label="Website" span={12}>
                        <a href={item.website}>{item.website}</a>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label="Incorporation Country"
                        span={12}
                      >
                        {item.incorporationCountry}
                      </Descriptions.Item>
                      <Descriptions.Item label="Company Legal Number">
                        {item.companyLegalNumber}
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

export default CompanyReports;

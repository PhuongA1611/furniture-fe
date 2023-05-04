import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import "./Dashboard.scss";

// @ts-ignore
import {
  FileTextOutlined,
  MoneyCollectOutlined,
  TeamOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import reportApi from "../../../api/report";
import { useState } from "react";
import { formatCurrency, formatNumber } from "../../../utils/common";
import { Link } from "react-router-dom";

const { Title } = Typography;
const Dashboard = () => {
  const [report, setReport] = useState(null); //[1,2,3
  const fetchReport = async () => {
    const { data } = await reportApi.getReport();
    setReport(data);
  };

  useEffect(() => {
    fetchReport();
  }, []);
  return (
    <div>
      <Card size="default" className="card-top">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <div className="text-card">Well begun is half done</div>
            <div>Complete the following steps to sell</div>
          </Col>
          <Col span={8}>
            <Row gutter={[16, 16]} justify="space-around">
              <Card size="small" className="card-bottom">
                <Row justify="space-between">
                  <div className="text-white">1. Upload a product</div>
                  <Link to="/admin/products/manage">
                    <Button size="small" style={{ color: "#FF7893" }}>
                      Go
                    </Button>
                  </Link>
                </Row>
                <div className="text-white">Fill in product information</div>
              </Card>
              <Card size="small" style={{ backgroundColor: "#D78EF6" }}>
                <Row justify="space-between">
                  <div className="text-white">2. Open user manage</div>
                  <Link to="/admin/user">
                    <Button size="small" style={{ color: "#f89897" }}>
                      Go
                    </Button>
                  </Link>
                </Row>
                <div className="text-white">Choose to open any channel</div>
              </Card>
            </Row>
          </Col>
        </Row>
      </Card>
      <Card size="default" className="card-top">
        <Title level={4} style={{ margin: "1rem" }}>
          Shop's data
        </Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              size="small"
              className="card-data"
              style={{ backgroundColor: "#FFEAEE" }}
            >
              <Row justify="space-between">
                <Col span={18}>
                  <div>Payment amount</div>
                  <Title level={3}>
                    {report && formatCurrency(Number(report.paymentAmount))}
                  </Title>
                  {/* <div>
                    <i>Yesterday 8638</i>
                  </div> */}
                </Col>
                <Col span={6}>
                  <MoneyCollectOutlined
                    style={{
                      backgroundColor: "#FF3A67",
                      fontSize: "36px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      alignItems: "center",
                      color: "white",
                      padding: "0.5rem",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="small"
              className="card-data"
              style={{ backgroundColor: "#E5EEFF" }}
            >
              <Row justify="space-between">
                <Col span={18}>
                  <div>Payment order</div>
                  <Title level={3}>
                    {report && formatNumber(report?.paymentOrder)}
                  </Title>
                  {/* <div>
                    <i>Yesterday 8638</i>
                  </div> */}
                </Col>
                <Col span={6}>
                  <FileTextOutlined
                    style={{
                      backgroundColor: "#3889FF",
                      fontSize: "36px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      alignItems: "center",
                      color: "white",
                      padding: "0.5rem",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="small"
              className="card-data"
              style={{ backgroundColor: "#EEE6FF" }}
            >
              <Row justify="space-between">
                <Col span={18}>
                  <div>Paying user</div>
                  <Title level={3}>{report && report.paymentUser}</Title>
                  {/* <div>
                    <i>Yesterday 8638</i>
                  </div> */}
                </Col>
                <Col span={6}>
                  <TeamOutlined
                    style={{
                      backgroundColor: "#762BDE",
                      fontSize: "36px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      alignItems: "center",
                      color: "white",
                      padding: "0.5rem",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              size="small"
              className="card-data"
              style={{ backgroundColor: "#D8F0E3" }}
            >
              <Row justify="space-between">
                <Col span={18}>
                  <div>Pending Order</div>
                  <Title level={3}>{report && report.pendingOrder}</Title>
                  {/* <div>
                    <i>Yesterday 8638</i>
                  </div> */}
                </Col>
                <Col span={6}>
                  <CarOutlined
                    style={{
                      backgroundColor: "#43CD7F",
                      fontSize: "36px",
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      alignItems: "center",
                      color: "white",
                      padding: "0.5rem",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;

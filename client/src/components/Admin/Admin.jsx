import React, { Component } from "react";
import { Tab, Row, Col, Nav, Card } from "react-bootstrap";
import FA from "react-fontawesome";
import Category from "./Category/Category";
import Product from "./Product/Product";
import User from "./User/User";
import "./Admin.scss";
import Switch from "react-bootstrap/esm/Switch";
class Admin extends Component {
  render() {
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="category">
        <Row>
          <Col sm={3}>
            <Card className="p-0 rounded-0">
              <Card.Header clasname="p-0 rounded-0">
                <h1 className="p-0 m-0 mx-auto d-flex justify-content-center">
                  <FA className="p-0 pr-3" name="linux" />
                  <span className="p-0">Admin Pannel</span>
                </h1>
              </Card.Header>
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="category">
                      <h3>
                        <FA className="pr-1" name="list" />
                        Category
                      </h3>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="product">
                      <h3>
                        <FA className="pr-1" name="shopping-cart" />
                        Product
                      </h3>
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey="user">
                      <h3>
                        <FA className="pr-1" name="user" />
                        User
                      </h3>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="order">
                      <h3>
                        <FA className="pr-1" name="file-text" />
                        Orther
                      </h3>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="chart">
                      <h3>
                        <FA className="pr-1" name="line-chart" />
                        Chart
                      </h3>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9}>
            <Switch>
              <Tab.Content>
                <Tab.Pane eventKey="category">
                  <Category />
                </Tab.Pane>
                <Tab.Pane to={"/product"} eventKey="product">
                  <Product />
                </Tab.Pane>
                <Tab.Pane to={"/user"} eventKey="user">
                  <User />
                </Tab.Pane>
              </Tab.Content>
            </Switch>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default Admin;

import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./components/Layout/Navigation";
// import Footer from "./components/Layout/Footer";
import ColorBox from "./components/Color/ColorBox";
import Home from "./components/Home/Home";
import Products from "./components/Product/Product";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Users from "./components/User/";
import AuthenticationComponent from "./components/Authentication/AuthenticationComponent";
import Protected from "./components/Authentication/Protected";
import CartContainer from "./containers/CartContainer";
import Bill from "./components/Purchase/Bill";
import Order from "./components/Order/Order";
import Signup from "./components/Login/Signup";

class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product" component={Products} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/checkout" component={Bill}></Route>
          <Route exact path="/colorbox">
            <Container className="mt-1">
              <Row>
                <Col>
                  <ColorBox />
                </Col>
                <Col>
                  <ColorBox />
                </Col>
              </Row>
            </Container>
          </Route>
          <Route path="/listproduct/1" component={Home} />
          <Route path="/about">
            <About key="0x000007" name="Name" engsub="Name" />
          </Route>
          <Route path="/order" component={Order} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <AuthenticationComponent>
            <Route path="/protected">
              <Protected />
            </Route>
            <Route path="/cart">
              <CartContainer />
            </Route>
          </AuthenticationComponent>
        </Switch>
        {/* <Footer /> */}
      </>
    );
  }
}

export default App;

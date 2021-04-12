import React, { useEffect, useState } from "react";
import axios from "axios";
import { getJwt } from "../../../helpers";
import { Table, Col, Row, Form } from "react-bootstrap";
import { Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

const UserList = (props) => {
  const [userList, setUserList] = useState(null);
  const [search, setSearch] = useState("");
  //
  const accessToken = getJwt();
  const headers = { Authorization: accessToken };
  //
  const sortByName = () => {
    const fecthData = async () => {
      const request = await axios.get("http://localhost:9999/user/sort", {
        headers: headers,
      });
      setUserList(request.data);
    };
    fecthData();
  };
  const searchByName = () => {
    if (search === "") {
      const fetchData = async () => {
        const request = await axios.get("http://localhost:9999/user", {
          headers: headers,
        });
        setUserList(request.data);
      };
      fetchData();
    } else {
      const fecthData = async () => {
        const request = await axios.get(
          "http://localhost:9999/user/search/" + search,
          {
            headers: headers,
          }
        );
        setUserList(request.data);
      };
      fecthData();
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get("http://localhost:9999/user", {
        headers: headers,
      });
      setUserList(request.data);
    };
    fetchData();
  }, []);
  console.log(userList);
  const ListUser = userList;
  if (userList != null)
    return (
      <>
        <Row>
          <Col>
            <Button
              variant="contained"
              color="primary"
              // size="small"
              onClick={sortByName}
            >
              Sort
            </Button>
          </Col>
          <Col>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  name="productname"
                  placeholder="Search"
                  onChange={(event) => setSearch(event.target.value)}
                  required
                />
              </Col>
              <Col>
                <Button
                  variant="contained"
                  color="primary"
                  // size="small"
                  onClick={searchByName}
                >
                  Find
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table className="mt-2" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>View Order</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user._id_user}</td>
                  <td>{user.name}</td>
                  <td>{user.gender == true ? "Boy" : "Girl"}</td>
                  <td>{user.birthday}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={"/admin-temp/order/user/" + user._id_user}>
                      View Order
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  return <div>Error</div>;
};
export default UserList;

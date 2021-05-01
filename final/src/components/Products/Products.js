import React, { useContext, useEffect, useState } from "react";
import {  Col, Card, Container, Row } from "react-bootstrap";
import HttpRequest from "../../Interceptors/AxiosInstance";
import Paging from "./Paging/Paging";
import styles from "./Products.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { useHistory, useLocation } from "react-router";

export default function Products(props) {
  const [Products, setProducts] = useState([]);
  const [minDescriptionLength, setminDescriptionLength] = useState(100);

  const [paging, setpaging] = useState({
    page: 1,
    pageSize: 4,
    total: 0,
    currentData: [],
  });

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/login" } };
  const [token, settoken] = useContext(AuthContext);

  const handleCLick = (item) => {
 
    let sliced = Products.slice(
      (item - 1) * paging.pageSize,
      item * paging.pageSize
    );
    setpaging({
      ...paging,
      currentData: Products.slice(
        (item - 1) * paging.pageSize,
        item * paging.pageSize
      ),
    });
  };

  const Logout = () => {
    localStorage.removeItem("token");
    settoken(null);
    history.replace(from);
  };
  const Login = () => {
    history.replace(from);
 };
  useEffect(() => {
    HttpRequest("https://fakestoreapi.com/products")
 
      .then((res) => {
        let json = res.data;
            setpaging({
          ...paging,
          total: json.length - 1,
          currentData: json.slice(0, paging.page * paging.pageSize),
        });
        setProducts(json);
      })
      .finally(() => {
   
      });
  }, []);




if((token != null)){
    if (paging.currentData && paging.currentData.length > 0) {
      return (
        <Container className={["mt-5"].join(" ")}>
          <Row>
            <Col className="text-right">
            <br></br>
              <button className="btn btn-danger mb-4" onClick={Logout}>
                logout
              </button>
            </Col>
          </Row>
          <Row>
            {paging.currentData.map((item, index) => {
              return (
                <Col lg={3} key={item.id}>
                 
                  <Card>
                  <Card.Body>
                  <Card.Title className={styles.title}>{item.title}</Card.Title>
                  <Card.Img variant="top" src={item.image} height="200" />
                  
        <Card.Text>
          {item.description.length > minDescriptionLength
            ? item.description.substring(0, minDescriptionLength) + "..."
            : item.description}
        </Card.Text>
        <Link
          to={"/product/" + item.id}
          className="btn btn-primary btn-block"
        >
          Details
        </Link>
      </Card.Body>
    </Card>
                </Col>
              );
            })}
          </Row>
          <Row className={[styles.HCenterd, "mt-5"].join(" ")}>
            <Paging HandleCLick={handleCLick} data={paging} />
          </Row>
        </Container>
      );
    } else {
      return (
      
        
      <div style={{
        display: "flex",
        justifyContent: "center", color: 'orange',
        alignItems: "center", marginTop: "200px", fontSize: "x-large"
      }} >Please Wait ...  </div>
    )
    }}
    else{
      return (
        <Container className={["mt-5"].join(" ")}>
        <Row>
          <Col className="text-right">
          <br></br>
            <button className="btn btn-success mb-4" onClick={Login}>
              login
            </button>
          </Col>
        </Row>
        
        <div style={{
          display: "flex",
          justifyContent: "center", color: 'red',
          alignItems: "center", marginTop: "200px", fontSize: "x-large"
        }} >Please Login ...  </div>
        </Container>
      )


    }

}

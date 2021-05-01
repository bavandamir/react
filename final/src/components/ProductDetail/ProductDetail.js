import React, {useContext, useEffect, useState } from "react";
import { Card, Alert,  Badge,  Breadcrumb,    Col,  Container,  Row,} from "react-bootstrap";

import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import { useHistory, useLocation } from "react-router";
export default function ProductDetail(props) {
  const [ProductId, setProductId] = useState(props.match.params.id);
  const [token, settoken] = useContext(AuthContext);
  const [Product, setProduct] = useState(null);
  useEffect(() => {
    if (ProductId) {
      fetch(`https://fakestoreapi.com/products/${ProductId}`)
        .then((res) => res.json())
        .then((json) => {
          setProduct(json);
        })
        .finally(() => {

        });
    }
  }, []);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/login" } };

  const Logout = () => {
    localStorage.removeItem("token");
    settoken(null);
    history.replace(from);
  };
  const Login = () => {
    history.replace(from);
 };

  if((token != null)){
    if (Product != null) {
      return (
        <Container className="mt-5">
          
           <Row>
            <Col className="text-right">
            <br></br>
              <button className="btn btn-danger mb-4" onClick={Logout}>
                logout
              </button>
            </Col>
          </Row>
          <Row>
            
            <Card>
              <Card.Body>
                <Row>
                  
                  <Col>
                    <h1>{Product.title}</h1>
                    <hr />
                    <Badge variant="secondary">{Product.category}</Badge>
                    <p>
                      <em>$ {Product.price}</em>
                    </p>
                    <p>{Product.description}</p>
                  
                  </Col>
                  <Col lg="6">
                    <img
                      alt={Product.title}
                      className="w-100 h-75"
                      src={Product.image}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
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
        }} >Please Login ... </div>
        </Container>
      )


    }
  
}

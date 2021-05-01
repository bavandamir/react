import React, { useContext, useState } from "react";
import { Card, Form,  Button,      Col,  Container,  Row,} from "react-bootstrap";
import "react-bootstrap";
import styles from "./Login.Module.css";
import { AuthContext } from "../../Contexts/AuthContext";
import HttpRequest from "../../Interceptors/AxiosInstance";
import { useHistory, useLocation } from "react-router";
const Login = () => {
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/home" } };

  const [token, settoken] = useContext(AuthContext);

  const [message, setmessage] = useState("");
  const handleSubmit = (e) => {

    e.preventDefault();
    HttpRequest({
      method: "POST",
      url: "https://fakestoreapi.com/auth/login",
      headers: {
        public: "true",
        "content-type": "application/json",
        accept: "applicaiton/json",
      },
      data: fields,
    }).then(
      (res) => {
        if (res.status == 200) {
     
          if (res.data && res.data.token) {
            localStorage.setItem("token", res.data.token);
            settoken(res.data.token);
            history.replace(from);
          } else {
            setmessage(res.data.msg);
          }
        } else {
          setmessage("error reaching auth server");
        }
      },
      (error) => {
        
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };


 
  return (
    
    <div className={styles.LoginBackground}>

      <Container>
        <Row className={styles.centered}>
        
            <Col lg="4" md="4" sm="8" xs="8" className={styles.HCenterd}>
              <Card>
                <Card.Body>
                  <h5>Login</h5>
                  <hr />

                  {message != "" ? (
                    <div className="alert alert-danger">{message}</div>
                  ) : null}

                  <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>username</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        value={fields.username}
                        name="username"
                        placeholder="Enter email"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>password</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        value={fields.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </form>
                </Card.Body>
              </Card>
            </Col>
         
        </Row>
      </Container>
    </div>
  );
};

export default Login;

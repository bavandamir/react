import React, { useContext, useEffect ,useState} from "react";
import { useHistory, useLocation } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { Card,    Col,  Container,  Row,} from "react-bootstrap";

export default function Home(props) {
 const [token, settoken] = useContext(AuthContext);
 const [Home, setHome] = useState(null);
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
useEffect(() => {

    fetch(`https://fakestoreapi.com/users/1`)
      .then((res) => res.json())
      .then((json) => {
        setHome(json);
      })
      .finally(() => {
      });
  
}, []);

if(token != null){
   
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
          <Card>
 
      <Card.Body>
      <Card.Title>
         {Home!= null ? Home.username : 'service down!'}
        </Card.Title>
        <Card.Text>
          {Home!= null ?Home.name.firstname: 'service down!'} {Home!= null ?Home.name.lastname: 'service down!'}
          <br></br>
          {Home!= null ?Home.address.city: 'service down!'} {Home!= null ?Home.address.zipcode: 'service down!'}
          <br></br>
          {Home!= null ?Home.phone: 'service down!'}
        </Card.Text>
       
      </Card.Body>
    </Card>

        
          </Container>
      );
    }
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
        }} >Please login ... </div>

</Container>
      );


    }


     }

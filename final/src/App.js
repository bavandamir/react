import React   from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {  BrowserRouter as Router,  Switch,  Route, Link } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import ProductDetail from "./components/ProductDetail/ProductDetail";


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top ">
        <ul class="navbar-nav">
          <li class="nav-item active">
           <a class="nav-link" ><Link className="nav-link" to={"/Home"}>Home</Link></a>
          </li>
          <li class="nav-item active">
           <a class="nav-link" ><Link className="nav-link" to={"/Products"}>Product</Link>  </a>
          </li>
        </ul>
      </nav>
    
      <AuthProvider>
        <Switch>
        <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
           <Route path="/Products"  >
            <Products />
          </Route>
          <Route path="/product/:id" component={ProductDetail} >
           </Route>
          <Route path="" >
            <Home />
          </Route>
        </Switch>
      </AuthProvider>
   
    </div>
    </Router>
    
  );
}

export default App;

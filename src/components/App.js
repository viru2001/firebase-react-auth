import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import { AuthProvider } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Login from './Login'
import ForgotPassword from "./ForgotPassword";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (

    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>

        <Router>
          <AuthProvider>

          <Switch>
          <PrivateRoute exact path="/firebase-react-auth/" component={Dashboard}/>
          <PrivateRoute exact path="/firebase-react-auth/update-profile" component={UpdateProfile}/>
            <Route path="/firebase-react-auth/signup" component={Signup} />
            <Route path="/firebase-react-auth/login" component={Login} />
            <Route path="/firebase-react-auth/forgot-password" component={ForgotPassword} />
          
           
          </Switch>
          </AuthProvider>
        </Router>

     


      </div>
    </Container>


  )
}

export default App;

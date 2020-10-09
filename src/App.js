import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Optimize from "./components/Transaction/Optimize";
import NavLinks from "./components/Navbar/NavLinks";
import PrivateRoute from "./components/Firebase/PrivateRoute";
import UserContextProvider from "./components/Firebase/UserContextProvider";

export default function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar
            color='transparent'
            brand='Expaflow'
            rightLinks={<NavLinks />}
            fixed
            changeColorOnScroll={{
              height: 200,
              color: "black",
            }}
          />
          <Switch>
            <PrivateRoute path='/Optimizer' component={Optimize} />
            <Route path='/' component={Home} />
          </Switch>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

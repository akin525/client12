import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import 'login.css';
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Pass from "views/auth/pass.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";



export default function Auth() {
  return (
    <>
      {/*<Navbar transparent />*/}
      <main>
        {/*<section className="relative w-full h-full py-40 min-h-screen">*/}
        {/*  <div*/}
        {/*    className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"*/}
        {/*    style={{*/}
        {/*      backgroundImage:*/}
        {/*        "url(" + require("assets/img/register_bg_2.png").default + ")",*/}
        {/*    }}*/}
        {/*  ></div>*/}
          <Switch>
            <Route path="/auth/pass" exact component={Pass} />
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Redirect from="/auth" to="/auth/login" />
            <Redirect from="/" to="/auth/login" />
            <Redirect from="/auth/pass" to="/auth/pass" />
          </Switch>
          {/*<FooterSmall absolute />*/}
        {/*</section>*/}
      </main>
    </>
  );
}

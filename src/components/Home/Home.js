import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles, Grid } from "@material-ui/core";
import Parallax from "../Parallax/Parallax.js";

const useStyles = makeStyles({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
  gridItem: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    "@media (min-width: 576px)": {
      maxWidth: "540px",
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px",
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px",
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px",
    },
  },
  title: {
    color: "#ffffff",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontSize: "5em",
    fontWeight: "300",
    fontFamily: `"Roboto", "Times New Roman", serif`,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textShadow: "-2px 1px 4px rgba(150, 149, 150, 1)",
  },
  subtitle: {
    fontSize: "1.313rem",
    fontWeight: "120",
    maxWidth: "400px",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    // boxShadow: "-2px 2px 3px 1px #ffffff,2px 2px 3px 1px #ffffff",
  },
});

export default function Home(props) {
  //   const [data, setData] = useState(null);
  //   useEffect(() => { }, []);
  const classes = useStyles();
  return (
    <>
      <Parallax filter image={require("../Images/stars.png")}>
        <div className={classes.container}>
          <Grid container className={classes.grid}>
            <Grid item className={classes.gridItem} xs={12} sm={12} md={6}>
              <br />
              <h1 className={classes.title}>Expaflow</h1>
              <h4 className={classes.subtitle}>
                Our objective is to provide an optimal solution for your cash
                flow needs!
              </h4>
              <br />
            </Grid>
          </Grid>
          <br />
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>Hello</div>
      </div>
    </>
  );
}

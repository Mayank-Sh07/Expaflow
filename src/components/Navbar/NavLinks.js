import React from "react";
import { CustomThemeContext } from "../../Theme/CustomThemeProvider";
import {
  makeStyles,
  List,
  ListItem,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  Home,
  Grain,
  Brightness4Rounded,
  Brightness7Rounded,
  LinkedIn,
  GitHub,
} from "@material-ui/icons";
import { UserContext } from "../Firebase/UserContextProvider";
import { LogoutIcon, ProfileIcon } from "../Icons";
import { FirebaseContext } from "../Firebase/FirebaseConfig";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  list: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit",
  },
  listItem: {
    float: "left",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5",
      },
    },
  },
  listItemText: {
    padding: "0 !important",
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.5375rem",
    borderRadius: "3px",
    textDecoration: "none",
    margin: "0px 6px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "12px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start",
      },
    },
  },
}));

export default function NavLinks(props) {
  const classes = useStyles();
  const { currentTheme, setTheme } = React.useContext(CustomThemeContext);
  const { currentUser } = React.useContext(UserContext);
  const Firebase = React.useContext(FirebaseContext);
  const history = useHistory();
  const isDark = Boolean(currentTheme === "dark");
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Button
          startIcon={<Home />}
          className={classes.navLink}
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          startIcon={<Grain />}
          className={classes.navLink}
          onClick={() => {
            history.push("/Optimizer");
          }}
        >
          Optimize
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.navLink}
          startIcon={isDark ? <Brightness4Rounded /> : <Brightness7Rounded />}
          onClick={() => {
            isDark ? setTheme("light") : setTheme("dark");
          }}
        >
          {isDark ? "Dark Mode" : "Light Mode"}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          className={classes.navLink}
          startIcon={!!currentUser ? <LogoutIcon /> : <ProfileIcon />}
          onClick={() => {
            !!currentUser
              ? Firebase.doSignOut()
              : Firebase.doSignInWithGoogle();
          }}
        >
          {!!currentTheme ? "Logout" : "Login"}
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          href='https://github.com/Mayank-Sh07/Expaflow'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            className={classes.navLink}
            size='small'
            style={{
              color: "#FFFFFF",
            }}
          >
            <GitHub />
          </IconButton>
        </a>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          href='https://www.linkedin.com/in/mayanksh07'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            className={classes.navLink}
            size='small'
            style={{
              color: "#B4CEFF",
            }}
          >
            <LinkedIn />
          </IconButton>
        </a>
      </ListItem>
      <ListItem className={classes.listItem}>
        <a
          href='https://www.linkedin.com/in/jigyasa-sa'
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconButton
            className={classes.navLink}
            size='small'
            style={{
              color: "#FFC0B4",
            }}
          >
            <LinkedIn />
          </IconButton>
        </a>
      </ListItem>
    </List>
  );
}

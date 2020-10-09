import React,{useState,useEffect,useContext} from "react";
import classNames from "classnames";
import {v4 as uuid} from "uuid";
import Optimzer from "./Optimizer";
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
  TextField,
  Container,
  Button,
  IconButton,
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import Parallax from "../Parallax/Parallax.js";
import { UserContext } from "../Firebase/UserContextProvider.js";
import { useForm } from "react-hook-form";
import { RupeeIcon } from "../Icons/index.js";
import { AccountTree, Add, Grain, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
  gridItem: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    
    flexBasis: "auto",
  },
  container: {
    zIndex: "12",
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
    margin: "1.75rem 0 2.45rem",
    textDecoration: "none",
    fontWeight: "300",
    fontFamily: `"Roboto", "Times New Roman", serif`,
    fontSize: "4em",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textShadow: "-2px 1px 4px rgba(150, 149, 150, 1)",
  },
  subtitle: {
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "300",
    fontFamily: `"Roboto", "Times New Roman", serif`,
    display: "inline-block",
    position: "relative",
    textShadow: "-2px 1px 2px rgba(150, 149, 150, 1)",
  },
  main: {
    position: "relative",
    zIndex: "3",
    paddingBottom: "20px"
  },
  mainRaised: {
    margin: "-60px 20px 30px",
    borderRadius: "6px",
  },
  gridItemCustom: {
    display:"flex",
     alignItems:"center",
     paddingLeft:"3px",
     paddingRight:"3px"
  },
  paddingHorizontal : {
    paddingRight:"10px"
  },
  formCustom:{
      border: "2px double black",
      borderRadius: "1em",
      padding: "25px 15px",
  },
  sectionTitle:{
    paddingTop: 30,
    paddingBottom: 20,
    fontWeight: 300,
    textAlign:"center"
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useContext(UserContext);
  const [transactions,setTransactions] = useState([]);

  const handleSubmittedDetails = (data) => {
    setTransactions([...transactions,{...data,id: uuid()}]);
    reset();
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction)=>(
        transaction.id !== id
      ))
    );
  }

  const transactionsList = () => {
    return transactions.map(tran => (
      <>
      <ListItem key={uuid()}>
        <ListItemAvatar>
          <Avatar>
            <AccountTree/>
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
        primary={`
          ${tran.debitor} owes ${tran.creditor} ₹${tran.amount} for ${tran.description} 
        `}/>
        <ListItemSecondaryAction>
            <IconButton onClick={()=>{
              deleteTransaction(tran.id)
            }} >
              <Delete />
            </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="middle"/>
      </>
    ));
  }
  return (
    <>
      <Parallax filter image={require("../Images/stars.png")}>
        <div className={classes.container}>
          <Grid container className={classes.grid} justify='center'>
            <Grid
              item
              className={classes.gridItem}
              xs={12}
              sm={12}
              md={6}
              style={{ textAlign: "center" }}
            >
              <Typography variant='h1' className={classes.title}>
                Expaflow Optimzer
              </Typography>
              <Typography variant='h4' className={classes.subtitle}>Settle debts, fast and easy!</Typography>
            </Grid>
          </Grid>
          <br />
        </div>
      </Parallax>
      <Paper className={classNames(classes.main, classes.mainRaised)}>
        <Container >
          <Typography variant="h3" className={classes.sectionTitle}>
            Add Transactions
          </Typography>
          <form
            noValidate
            onSubmit={handleSubmit((data) => handleSubmittedDetails(data))}
            className= {classes.formCustom}
          >
            <Grid container alignItems='center' justify='center'>
              <Grid item xs={12} sm={2} md={2}
              className={classes.gridItemCustom}
              >
                <TextField
                  id='debitor-name-inp'
                  name='debitor'
                  label='Payer'
                  inputProps={{ maxLength: 50 }}
                  helperText='debitor name'
                  type='text'
                  inputRef={register}
                  autoComplete='off'
                  fullWidth
                  required
                />
              </Grid>              
              <Grid item xs={12} sm={4} md={3}
              className={classes.gridItemCustom}
              >
              <Typography variant='h6' className={classes.paddingHorizontal}>owes</Typography>
                <TextField
                  id='creditor-name-inp'
                  name='creditor'
                  label='Payee'
                  inputProps={{ maxLength: 50 }}
                  helperText='creditor name'
                  type='text'
                  inputRef={register}
                  autoComplete='off'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={2} md={2}
              className={classes.gridItemCustom}
              >
                <RupeeIcon width="22" className={classes.paddingHorizontal}/>
                <TextField
                  id='debit-amount'
                  name='amount'
                  label='Amount'
                  helperText='debit'
                  type='number'
                  inputRef={register}
                  autoComplete='off'
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}
              className={classes.gridItemCustom}
              >
              <Typography variant='h6' className={classes.paddingHorizontal}>for</Typography>
                <TextField
                  id='transaction-description'
                  name='description'
                  label='Transaction'
                  inputProps={{ maxLength: 70 }}
                  helperText='*max 70 characters'
                  type='text'
                  inputRef={register}
                  autoComplete='off'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1} align="center">
                <Fab type="submit" size="medium">
                  <Add/>
                </Fab>
              </Grid>
            </Grid>
          </form>
          <Typography variant="h3" className={classes.sectionTitle}>
            Transaction List
          </Typography>
          <Container maxWidth="md" disableGutters style={{
            borderWidth: "2px",
            borderStyle: "solid dotted solid dotted",
            borderRadius: "0.5em"
          }}>
            {
            (transactions.length>0)
            ? <List>
              {transactionsList()}
              </List>
            : <Typography variant="h5" align="center">Nothing here...</Typography>
            }
          </Container>
          {
          (transactions.length>0)
          ? <>
              <Typography variant="h3" className={classes.sectionTitle}>
              Transaction List
              </Typography>
              <Container maxWidth="md" disableGutters style={{
                borderWidth: "2px",
                borderStyle: "solid dotted solid dotted",
                borderRadius: "0.5em"
                }}>
              <Optimzer data={transactions}/>
              </Container>
           </>
          : <></>
          }
        </Container>
      </Paper>
    </>
  );
}

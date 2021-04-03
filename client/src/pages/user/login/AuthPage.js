import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import LockIcon from "@material-ui/icons/Lock";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import "./AuthPage.scss";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const AuthPage = (props) => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeIndex = (event) => {
    setTab(event);
  };

  return (
    <div className="AuthContainer">
      <Tabs
        value={tab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      <SwipeableViews
        index={tab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={tab} index={0}>
          <TextField
            className="inputbox"
            id="input-with-icon-textfield"
            label="Username"
            variant="outlined"
            style={{width:'100%'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="inputbox"
            id="input-with-icon-textfield"
            label="Password"
            variant="outlined"
            style={{width:'100%'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          Item Two
        </TabPanel>
      </SwipeableViews>
      <Button variant="outlined" className="button">Sign In</Button>
      <Link href="#" variant="body2">
        {"Forgot password ?"}
      </Link>
    </div>
  );
};

let a = 4;

export default AuthPage;

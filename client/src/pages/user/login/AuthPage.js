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
import styled from "styled-components";
import "./AuthPage.scss";

const AuthContainer = styled.div`
  width: 328px;
  min-height: 280px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 400px) {
    width: 95%;
    max-width: 328px;
  }

  background-color: white;
  padding: 10px 10px 10px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 1);

  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
`;


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

const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const AuthPage = (props) => {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeIndex = (event) => {
    setTab(event);
  };

  return (
    <AuthContainer>
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

      <SwipeableViews index={tab} onChangeIndex={handleChangeIndex}>
        <TabPanel value={tab} index={0}>
          <VerticalStack>
            <TextField
              id="input-with-icon-textfield"
              label="Username"
              variant="outlined"
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary"/>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputbox"
              id="input-with-icon-textfield"
              label="Password"
              variant="outlined"
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary"/>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <Button variant="contained" className="button" color="primary" style={{width: "80%"}}>
              Sign In
            </Button>
            <br />
            <Link href="#" variant="body2" color="secondary">
              {"Forgot password ?"}
            </Link>
          </VerticalStack>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <VerticalStack>
            <TextField
              id="input-with-icon-textfield"
              label="Username"
              variant="outlined"
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle color="primary"/>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputbox"
              id="input-with-icon-textfield"
              label="Password"
              type="password"
              variant="outlined"
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="inputbox"
              id="input-with-icon-textfield"
              label="Re-password"
              variant="outlined"
              style={{ width: "100%", marginTop: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" >
                    <LockIcon color="primary"/>
                  </InputAdornment>
                ),
              }}
            />
            <br />
            <Button variant="contained" className="button" color="primary" style={{width: "80%"}}>
              Sign Up
            </Button>
          </VerticalStack>
        </TabPanel>
      </SwipeableViews>
    </AuthContainer>
  );
};

let a = 4;

export default AuthPage;

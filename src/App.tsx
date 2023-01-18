import {Box, CircularProgress} from "@mui/material";
import CalendarPage from "./pages/Calendar/CalendarPage";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import React, {useState} from "react";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import {USER_STORAGE_KEY} from "./api/constants";
import {useEffect} from "react";

function App() {
  const [token, setToken] = useState<string | null>();
  const [loaded, setLoaded] = useState<Boolean>(false)
  const history = useHistory();
  const changePage = (url: string) =>{
    history.push(url);
  }

  useEffect(() => {
    const data = localStorage.getItem(USER_STORAGE_KEY);
    if (data) {
      const loginData = JSON.parse(data ?? "")
      if (loginData.token) {
        setToken(loginData.token)
      }
    }
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <Box display="flex" justifyContent="center" alignItems="center">
      <CircularProgress/>
    </Box>
  }

  if (!token) {
    if (history.location.pathname === "/") {
      return <LoginPage setToken={setToken} changePage={changePage}/>
    }
  }


  return <>
    <Switch>
      <Route path="/login">
        <LoginPage setToken={setToken} changePage={changePage}/>
      </Route>
      <Route path="/register">
        <RegisterPage setToken={setToken} changePage={changePage}/>
      </Route>
      <Route path="/" render={() => <Redirect to="/login"/>}>
        <CalendarPage token={token!} setToken={setToken}/>
      </Route>
    </Switch>
  </>
}

export default App;

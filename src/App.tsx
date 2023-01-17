import { Box, CircularProgress, Typography } from "@mui/material";
import CalendarPage from "./pages/Calendar/CalendarPage";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useState } from "react";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import { USER_STORAGE_KEY } from "./api/constants";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState<string | null>();
  const [loaded, setLoaded] = useState<Boolean>(false)
  const history = useHistory();
  console.log(history.location.pathname);

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
      <CircularProgress />
    </Box>
  }

  if (!token ) {
    if(history.location.pathname !== "/register")
    {
        return <LoginPage setToken={setToken} />
    }
  }



  return <>
  <Switch>
    <Route path="/login">
      <LoginPage setToken={setToken} />
    </Route>
    <Route path="/register">
      <RegisterPage setToken={setToken} />
    </Route>
    <Route path="/">
      <CalendarPage token={token!} setToken={setToken} />
    </Route>
  </Switch>
</>
      
   
}

export default App;

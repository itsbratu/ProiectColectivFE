import { Box, CircularProgress, Typography } from "@mui/material";
import CalendarPage from "./pages/Calendar/CalendarPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from "react";
import LoginPage from "./pages/Login/Login";
import { USER_STORAGE_KEY } from "./api/constants";
import { useEffect } from "react";

function App() {
  const [token, setToken] = useState<string>();
  const [loaded, setLoaded] = useState<Boolean>(false)

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

  if (!token) {
    return <LoginPage setToken={setToken} />
  }

  return <BrowserRouter>
    <Switch>
      <Route path="/">
        <CalendarPage />
      </Route>
      <Route path="/login">
        <LoginPage setToken={setToken} />
      </Route>
    </Switch>
  </BrowserRouter>
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Page
import Homepage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import { useAppDispatch } from "./app/hooks";
import { setCredentials } from "./slices/user.slice";
import { useEffect } from "react";
import AuthRoute from "./common/AuthRoute";

function App() {
  const dispatch = useAppDispatch();
  dispatch(setCredentials());

  return (
    <div>
      <Router>
        <Switch>
          <AuthRoute exact path="/" Component={Homepage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

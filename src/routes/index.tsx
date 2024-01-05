import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home/index";
import { Signup } from "../pages/Signup/index";
import { Login } from "../pages/Login/index";
import { Dashboard } from "../pages/Dashboard/index";
import { useAuth } from "../providers/AuthContext";
import { Statistics } from "../pages/Statistics";

export const Routes = () => {
  const { accessToken } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home}>
        {!!accessToken && <Redirect to="/dashboard" />}
      </Route>
      <Route path="/signup" component={Signup}>
        {!!accessToken && <Redirect to="/dashboard" />}
      </Route>
      <Route path="/login" component={Login}>
        {!!accessToken && <Redirect to="/dashboard" />}
      </Route>
      <Route path="/dashboard" component={Dashboard}>
        {!accessToken && <Redirect to="/" />}
      </Route>
      <Route path="/statistics" component={Statistics}>
        {!accessToken && <Redirect to="/" />}
      </Route>
    </Switch>
  );
};

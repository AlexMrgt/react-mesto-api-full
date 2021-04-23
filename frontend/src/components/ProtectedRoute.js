import { useContext } from 'react';
import { AuthorizedContext } from "../contexts/AuthContext";
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ path, children }) {

  const isLoggedIn = useContext(AuthorizedContext);
  return (
    <Route path={path} exact>
      {isLoggedIn ? children : <Redirect to="/sign-in" />}
    </Route>
  )

}

export default ProtectedRoute;

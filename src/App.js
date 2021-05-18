import { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import AddEditForm from './pages/AddEditForm';
import ListOfSurveys from './pages/ListOfSurveys';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ResetPassword from './pages/ResetPassword';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [loggedInAs, setLoggedInAs] = useState('1');

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login setIsAuth={setIsAuth} setLoggedInAs={setLoggedInAs} />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <ProtectedRoute
            exact
            path="/surveys"
            component={ListOfSurveys}
            isAuth={isAuth}
            loggedInAs={loggedInAs}
            setIsAuth={setIsAuth}
            setLoggedInAs={setLoggedInAs}
          />
          <ProtectedRoute
            exact
            path="/add-edit-form"
            component={AddEditForm}
            isAuth={isAuth}
            loggedInAs={loggedInAs}
            setIsAuth={setIsAuth}
            setLoggedInAs={setLoggedInAs}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

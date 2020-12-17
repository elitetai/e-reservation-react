import React from 'react'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Customer from './pages/Customer' 
import Owner from './pages/Owner' 
import { Switch, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
      <ToastContainer pauseOnHover={false} />
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Homepage/>
        </Route>
        <Route path="/owner" component={Owner}/>
        <Route path="/customer" component={Customer}/>
      </Switch>
    </div>
  );
}

export default App;

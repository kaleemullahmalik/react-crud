import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import AddUser from './Components/AddUser';
import ViewUser from './Components/ViewUser';
import UpdateUser from './Components/UpdateUser';
import DeleteUser from './Components/DeleteUser';

class App extends Component {

 
  render() {

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/addUser" component={AddUser} />
          <Route path="/viewUser" component={ViewUser} />
          <Route path="/updateUser" component={UpdateUser} />
          <Route path="/DeleteUser" component={DeleteUser} />
        </div>
      </Router>    
    );
  }
}

class Home extends Component {

  componentDidMount() {
    document.title = 'Admin for Users';
}
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="text-center">Admin Panel for Users</h1>
        </div>
        <Buttons />
      </div>
    );
  }
}

class Buttons extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Link className="btn btn-success" to="/addUser" style={{borderRadius:15}}>Add User</Link>
        </div>
        <div className="col-md-3">
          <Link className="btn btn-info" to="/viewUser" style={{borderRadius:15}}>View User</Link>
        </div>
        <div className="col-md-3">
          <Link className="btn btn-primary" to="/updateUser" style={{borderRadius:15}}>Update User</Link>
        </div>
        <div className="col-md-3">
          <Link className="btn btn-danger" to="/deleteUser" style={{borderRadius:15}}>Delete User</Link>
        </div>
      </div>
    );
  }
}


export default App;


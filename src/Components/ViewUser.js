import React, { Component } from 'react';
import axios from 'axios';

class ViewUser extends  Component {

    constructor(props){
        super(props);
        this.state = {
            userId:'',
            userIdErr:'',
            noUserErr:'',
            getUsers:false,
            getUserById:false,
            userData:''
        }

    }

    handleViewAllUsers = () => {

        axios({method: 'get',url: 'http://localhost:4000/getUser',}).then(response => {
            if(response.status===200){
                
                if(response.data.length!==0){
                    this.setState({getUsers:true,getUserById:false,noUserErr:'',userData:response});
                }
                if(response.data.length===0){
                    this.setState({noUserErr:'No User exist in DB.'});
                }
            }
        });
        
    }

    handleUserIdChange = e => {
        this.setState({userId:e.target.value});
    }

    handleViewUserById = () => {
        if(this.state.userId===''){
            this.setState({userIdErr:'User Id is required'});  
        }
        if(this.state.userId!==''){
            const userId = this.state.userId;
            
            axios({method: 'get',url: 'http://localhost:4000/getUser/'+userId,}).then(response => {
                
                if(response.status===200){
                    
                    if(response.data!==null){
                        this.setState({getUsers:false,getUserById:true,userIdErr:'',userData:response});
                    }
                    
                    if(response.data===null){
                        this.setState({userIdErr:'User with this Id does not exist.'});
                    }
                }
            });
            //this.setState({userIdErr:'User Id does not exist'});
            
        }
        
    }


    componentDidMount() {
        document.title = 'View User';
    }

    render() {
        return(
            <div className="container">
                <div className="jumbotron">
                    <h1 className="text-center">View User</h1>
                </div>
                <div className="row">
                    <div className="col-md-6">
                         <button className="btn btn-info" style={{borderRadius:15}} onClick={this.handleViewAllUsers}>View All</button> 
                         <br/>
                         <span className="text-danger">{this.state.noUserErr}</span>   
                    </div>
                    
                    <div className="col-md-6">
                        <div className="form-inline">
                            <div className="form-group">
                                <label>User ID : </label>
                                <input type="text" className="form-control" placeholder="Enter User Id" value={this.state.userId} onChange={this.handleUserIdChange}></input>
                            </div>
                            <div className="form-group">
                                <button  className="btn btn-info" onClick={this.handleViewUserById}>View By ID</button>
                            </div>
                        </div>
                        <span className="text-danger">{this.state.userIdErr}</span> 
                    </div>
                </div>
                <br />
               

                <GetUsers state={this.state}/>

            </div>
        );
    }
}

class GetUsers extends Component {
    render(){

        if(this.props.state.getUsers===true && this.props.state.getUserById===false){

            const data = this.props.state.userData.data;
            const user = Object.keys(data).map((value,index)=>(
                <div className='well' key={index}>
                    <h4><strong>ID : </strong>{data[value]._id}</h4>
                    <h4><strong>Name : </strong>{data[value].username}</h4>
                    <h4><strong>Age : </strong>{data[value].age}</h4>
                </div>
            ));
            return (
                <div>
                    {user}
                </div>
            );
        }
        if(this.props.state.getUsers===false && this.props.state.getUserById===true){

            const data = this.props.state.userData.data;
            const user = (
                <div className='well'>
                    <h4><strong>ID : </strong>{data._id}</h4>
                    <h4><strong>Name : </strong>{data.username}</h4>
                    <h4><strong>Age : </strong>{data.age}</h4>
                </div> 
            );
            //console.log(data);
            return (
                <div>
                    {user}
                </div>
            );
        }

        if(this.props.state.getUsers===false && this.props.state.getUserById===false){
            return null;
        }
        
    }

}


export default ViewUser;
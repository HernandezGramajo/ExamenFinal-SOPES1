import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
 
        state ={
            form:{
                username: '',
                password: ''
            }
            ,
            estado:"Login"
        }

    

     url = "http://localhost:3000";

    handleChange= async e => {
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    } 

    iniciarSesion = async()=>{
        const  data = {

            user: this.state.form.username,
            password : this.state.form.password


            }

        if(this.state.form.username !="" && this.state.form.password !=""){
            const login = await fetch( this.url+'/login',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
                 })
                .then(response =>{
                return response.text();
                })
                .then( response =>{
                return response;
                })

            if(login =="exitoso"){
                this.setState({
                    ...this.state, estado:"Usuario "+this.state.form.username+"  Logueado"
                })
            }else{
                this.setState({
                    ...this.state, estado:"El usuario "+this.state.form.username+" no existe"
                })
            }    
            
        }
    }

    registar = async()=>{
      const  data = {

            user: this.state.form.username,
            password : this.state.form.password


            }

        if(this.state.form.username !="" && this.state.form.password !=""){
            const registro = await fetch(this.url+'/registrar',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data)
                 })
                .then(response =>{
                return response.text();
                })
                .then( response =>{
                return response
                })

            if(registro =="exitoso"){
                this.setState({
                    ...this.state, estado:"Usuario "+this.state.form.username+" registrado"
                })
            }else{
                this.setState({
                    ...this.state, estado:"Usuario "+this.state.form.username+" no registrado"
                })
            }    
            
        }
    }

    render(){
        return( <div className = "containerPrincipal">
               
                <div className = "containerSecundario">
                    <label><h1>{this.state.estado}</h1></label>
                    <div className = "from-group">
                        <label>User</label>
                         <br/>
                         <input type ="text" className = "from-control" 
                         name ="username"
                         onChange = {this.handleChange}/>
                         <br />
                         <label>Password</label>
                         <br/>
                         <input type ="password" className = "from-control" 
                         name = "password"
                         onChange = {this.handleChange} />
                         <br/>
                         <br/>
                         <button className = "btn btn-primary" onClick ={()=>this.iniciarSesion()}> Login</button>
                         <br/>
                         <br/>
                         <button className = "btn btn-warning" onClick ={()=> this.registar()}> Register</button>

                    </div>

                </div>
            
        </div>)
       
    }



}


export default App;
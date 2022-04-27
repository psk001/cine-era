import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form';


class LoginForm extends Form {

    state={
        data:{
            username:"",
            password:""
        },
        errors:{
            'username': '',
            'password': ''
        }
    }

    formSchema=Joi.object({
        username: Joi.string()
                     .required()
                     .label('Username'),
                     
        password: Joi.string()
                     .required()
                     .label('Password')
    })

 

    handleChange = ({currentTarget: input}) =>{

        const errors = {...this.state.errors}
        const errorMessage = this.validateProperty(input)
        
        if(errorMessage) errors[input.name] = errorMessage
        else delete errors[input.name]

        const data = {...this.state.data}
        data[input.name] = input.value
        this.setState({data, errors})
    }


    doSubmit = () => {
        console.log("submitted")
    }

    render() { 
        // const {data, errors} = this.state
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit} >
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')} 
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;

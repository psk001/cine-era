import React from 'react';
import { Joi } from 'joi-browser';
import Form from '../common/form';


class RegisterForm extends Form {

    state={
        data: {
            username:"",
            password:"",
            name:""
        },
        errors: {}
    }

    schema= Joi.object({
        username: Joi.string()
                     .required()
                     .email()
                     .label("username"),
        password: Joi.string()
                     .required()
                     .min(5)
                     .label("password"),
        name: Joi.string()
                 .required()
                 .label("name")
    })

    doSubmit = () => {
        console.log("submitted")
    }

    render() { 
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username",  "Username")}
                    {this.renderInput("password",  "Password", "password")}
                    {this.renderInput("name",  "Name")}
                    {this.renderInput("Register")}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;

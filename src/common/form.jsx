import React, { Component } from 'react';
import { Joi } from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = { 
        data:{},
        errors:{}
    }

    validate = () => {
        const options = {abortEarly:false}
        const {error} = this.formSchema.validate(this.state.data, options)
      
        if(!error) return null;

        const errors={}

        for(let item of error.details) 
            errors[item.path[0]]=item.message;

        return errors;
    }


    validateProperty = ({name, value}) => {
        const obj = {[name]: value}
        const propertySchema = Joi.object({[name]: this.formSchema[name]})
        const {error }= propertySchema.validate(obj)
        return (error ? error.details[0].message : null)
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const errors = this.validate();
        console.log(errors)
        this.setState({errors: errors || {} })
        
        if(errors) 
            return;

        this.doSubmit()
    }

    renderInput(name, label, type='text'){
        let {data, errors} = this.state;
        return(
            <Input 
                name={name}
                label={label}
                type={type}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        )
    }

    renderButton = (label) => (
        <button 
            disabled={this.validate}
            className="btn btn-primary"
        >
            {label}
        </button>        
    )

    renderSelect(name, label, options){
        const {data, errors} = this.state

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                error={errors[name]}
            >

            </Select>
        )

    }

}
 
export default Form;
import React, { Component } from 'react';

import classes from './Appointment.module.css';
import axios from "../../axios-appt";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router";
import {toast} from 'react-toastify';

class Appointment extends Component {
    state = {
        apptForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'col-sm-6 col-md-6',
                label: 'Name'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                classes: 'col-sm-6 col-md-6',
                label: 'Email'
            },
            date: {
                elementType: 'date',
                elementConfig: {
                    type: 'date'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                classes: 'col-sm-6 col-md-6',
                label: 'Select Date'
            },
            department: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'nuerology', displayValue: 'Nuerology'},
                        {value: 'cardiology', displayValue: 'Cardiology'},
                        {value: 'oncology', displayValue: 'Oncology'},
                        {value: 'gastroenterology', displayValue: 'Gastroenterology'},
                        {value: 'dermatology', displayValue: 'Dermatology'},
                        {value: 'rheumatology', displayValue: 'Rheumatology'}
                    ]
                },
                value: 'nuerology',
                validation: {},
                valid: true,
                classes: 'col-sm-6 col-md-6',
                label: 'Select Department'
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                classes: 'col-sm-12 col-md-12',
                label: 'Phone Number'
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Additional Message'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                classes: 'col-sm-12 col-md-12',
                label: 'Message'
            }
        },
        formIsValid: false,
        loading: false
    }

    apptHandler = (event ) => {
        event.preventDefault();
        this.setState( { loading: true } );
        const formData = {};
        for (let formElementIdentifier in this.state.apptForm) {
            formData[formElementIdentifier] = this.state.apptForm[formElementIdentifier].value;
        }
        const appt = {
            apptData: formData
        }
        axios.post( '/appts.json', appt )
            .then( response => {
                if (response.data.name && response.data.name.length > 0) {
                    this.setState( { loading: false } );
                    this.props.history.push( '/' );
                    toast.success('Appointment Booking Successful! ', {autoClose:3000});
                } else {
                    toast.error('Something went wrong! ', {autoClose:3000});
                }
            } )
            .catch( error => {
                this.setState( { loading: false } );
                toast.error('Something went wrong! ', {autoClose:3000});
            } );
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedApptForm = {
            ...this.state.apptForm
        };
        const updatedFormElement = {
            ...updatedApptForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedApptForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedApptForm) {
            formIsValid = updatedApptForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({apptForm: updatedApptForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.apptForm) {
            formElementsArray.push({
                id: key,
                config: this.state.apptForm[key],
                classes: this.state.apptForm[key].classes,
                label: this.state.apptForm[key].label,
            });
        }
        let form = (
            <form onSubmit={this.apptHandler}>
                <div className="row">
                {formElementsArray.map(formElement => (
                    <div className={formElement.classes} key={formElement.id}>
                        <Input
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}
                            label={formElement.label}/>
                    </div>

                ))}
                </div>
                {/*<Button btnType="Success" disabled={!this.state.formIsValid}>Submit Appointment</Button>*/}
                <button type="submit" disabled={!this.state.formIsValid} className="form-control" id="cf-submit" name="submit">Submit Button </button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.Appointment}>
                <h2>Make an appointment</h2>
                {form}
            </div>
        );
    }
}

export default withRouter(Appointment);
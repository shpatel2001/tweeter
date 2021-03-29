import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import '../bulma.min.css';

export default class SignUp extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
            username: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearError = this.clearError.bind(this);
    }
    
    clearError()
    {
        this.setState({ error: '' })
    }

    handleChange(event) 
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password)
            .then(() => {
                console.log("Signed up, now do something");
                console.log("Maybe set their displayName to " + this.state.username);
            });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h1 className="is-size-2">Sign up for <Link to="/">Tweeter</Link>
                    </h1>

                    <div className="field">
                        <div className="control">
                            <input placeholder="Username" name="username" type="text" onChange={this.handleChange} value={this.state.username } className="input my-1"></input>
                        </div>

                        <div className="control">
                            <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email} className="input my-1"></input>
                        </div>   

                        <div className="control">
                            <input placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password} className="input my-1"></input>
                        </div>
                    </div>

                    { this.state.error ? (
                    <div className="notification is-danger">
                        <button className="delete" onClick={ this.clearError }></button>
                        { this.state.error ? <p>{ this.state.error }</p> : null }
                    </div>
                    ) : null }

                    <div className="has-text-right">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                        <button type="submit" className="button is-outlined is-rounded">Sign up</button>
                    </div>

                </form>
            </div>
        )
    };
}
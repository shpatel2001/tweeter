import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import '../bulma.min.css';

export default class Login extends Component {
    constructor(props) 
    {
        super(props);
        this.state = {
            error: null,
            email: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event)
    {
        event.preventDefault();
        this.setState({ error: "" });
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() 
    {
        return (
            <div className="container">
                <form autoComplete="on" onSubmit={this.handleSubmit}>
                    <h1 className="is-size-2">Login to <Link to="/">Tweeter</Link></h1>
                    <p>
                        Fill in the form below to login to your account.
                    </p>

                    <div className="field">
                        <div className="control">
                            <input className="input my-1" placeholder="E-mail" name="email" type="email" onChange={this.handleChange} value={this.state.email} />
                        </div>
                        
                        <div className="control">
                            <input className="input my-1" placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password} />
                        </div>
                    </div>

                    {this.state.error ? (
                    <div className="notification is-danger">
                        { this.state.error ? <p>{ this.state.error }</p> : null }
                    </div>
                    ) : null }

                    <div className="has-text-right">
                        <p>Don't have an account? <Link to="/signup">Sign up!</Link></p>
                        <button type="submit" className="button is-outlined is-rounded">Login</button>
                    </div>
                </form>
            </div>
        );
    }
}
import { Component } from 'react';
import { Link } from "react-router-dom";
import '../bulma.min.css';

export default class Home extends Component
{
    render()
    {
        return(
            <div>
                <h1>Welcome to Tweeter</h1>
                <p>
                    <Link to="/login">Login</Link> or <Link to="/signup">Sign up!</Link>
                </p>
            </div>
        )
    }
}
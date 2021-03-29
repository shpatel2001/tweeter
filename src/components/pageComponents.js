import React, { Component } from "react";
import { Link } from "react-router-dom";

class pageTitle extends Component
{
    render()
    {
        return (
            <h1><Link to="/">Tweeter</Link></h1>
        );
    }
}
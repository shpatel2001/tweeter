import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import { auth, db } from "../services/firebase";

export default class Feed extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            user: auth().currentUser,
            tweets: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false 
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount()
    {
        this.setState({ readError: null });
        try {
            db.ref("tweeter-19786-default-rtdb").on("value", snapshot => {
                let tweets = [];
                snapshot.forEach((snap) => {
                    tweets.push(snap.val());
                });
                this.setState({ tweets });
            })
        } catch (error) {
            this.setState({ readError: error.message });
        }
    }

    handleChange(event)
    {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) 
    {
        event.preventDefault();
        this.setState({ writeError: null });
        try {
            await db.ref("tweets").push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid 
            });
            this.setState({ content: '' });
        } catch (error) {
            this.setState({ writeError: error.message });
        }
    }

    render()
    {
        return (
            <div>
                <div className="tweets">
                    {this.state.tweets.map(tweet => {
                        return <p key={tweet.timestamp}>{tweet.content}</p>
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} value={this.state.content}></input>
                    { this.state.error ? <p>{this.state.writeError}</p> : null }
                    <button type="submit">Send</button>
                </form>
                <div>
                    Login in as: <strong>{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}
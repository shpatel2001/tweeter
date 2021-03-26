import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin } from "../helpers/auth";
import { auth, db } from "../services/firebase";

export default class Feed extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          user: auth().currentUser,
          chats: [],
          content: '',
          readError: null,
          writeError: null,
          loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
      }

    async componentDidMount() {
        this.setState({ readError: null, loadingChats: true });
        try {
          db.ref("chats").on("value", snapshot => {
            let chats = [];
            snapshot.forEach((snap) => {
              chats.push(snap.val());
            });
            chats.sort(function (a, b) { return a.timestamp - b.timestamp })
            this.setState({ chats });
            this.setState({ loadingChats: false });
          });
        } catch (error) {
          this.setState({ readError: error.message, loadingChats: false });
        }
      }

    handleChange(event)
    {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ writeError: null });
        const chatArea = this.myRef.current;
        try {
          await db.ref("chats").push({
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
                    {this.state.chats.map(chat => {
                        let date = new Date(chat.timestamp);
                        date = date.toString();
                        return <p key={chat.timestamp}>{date}: <strong>{chat.content}</strong></p>
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
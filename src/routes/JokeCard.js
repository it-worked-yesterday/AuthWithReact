import React from 'react';
import { Card } from 'antd';
const axios = require('axios');

class JokeCard extends React.Component {
    constructor() {
        super();
        this.state = {
            jokeText: "",
            activeConnection: false
        }
    }
    componentWillMount() {
        this.getRandomJoke()
            .then((res) => {
                if (!res) {
                    this.setState({
                        jokeText: this.getDefaultJoke(),
                        activeConnection: false
                    }) ;
                    console.log("error abba ",res);
                } else {
                    this.setState({
                        jokeText: res.data.joke,
                        activeConnection: true
                    }) ;
                    console.log(res);
                }
            })
            .catch((error) => {
                console.log("error"+error);
                this.setState({
                    jokeText: this.getDefaultJoke(),
                    activeConnection: false
                }) ;
            });
    }
    getRandomJoke() {
        return axios({
            url: "https://icanhazdadjoke.com/",
            method: 'get',
            data: null,
            headers: {
                'Accept': 'application/json'
            }
        });
    }
    getDefaultJoke() {
        return "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away."
    }
    render() {
        return (
            <Card >
                <p>
                    {this.state.jokeText}
                </p>
            </Card>);
    };

}
export default JokeCard;
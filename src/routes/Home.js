import React from 'react';
import JokeCard from './JokeCard';
import '../App.css';

class Home extends React.Component {
    render(){
        return (
            <div className="jokeCard">
                <JokeCard  />
            </div>
        );
    };
}

export default Home;
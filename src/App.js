import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Item from './components/Item';
import birds from './birds.json';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.handleShuffleBirds = this.handleShuffleBirds.bind(this)
  };

  state = {
    score: 0,
    topScore: 0,
    maxScore: 12,
    message: "Click on a bird to begin",
    messageClass: "",
    birds: birds
  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let tempValue;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tempValue;
    }
    return array;
  };

  handleCorrectSelection = () => {
    if (this.state.score + 1 > this.state.topScore) {
      this.setState({topScore: this.state.topScore + 1})
    }
    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: this.state.score + 1, message: "Congratulations! You clicked all the birds!", messageClass: "correct"})
    } else {
      this.setState({score: this.state.score + 1, message: "Correct!", messageClass: "correct"})
    }
  };

  handleResetWin = (currentBirds) => {
    if (this.state.score + 1 === this.state.maxScore) {
      this.setState({score: 0, topScore: 0})

      const updatedBirds = currentBirds.map(bird => (true) ? { ...bird, isClicked: false } : bird)
      return updatedBirds
    } else {
      return currentBirds
    }
  };

  handleIncorrectSelection = () => {
    this.setState({score: 0, message: "Incorrect!"})

    const updatedBirds = this.state.birds.map(bird => bird.isClicked === true ? { ...bird, isClicked: false } : bird)
    return updatedBirds
  };

  handleShuffleBirds = (name) => {
    var resetNeeded = false;
    const birds = this.state.birds.map(bird => {
      if (bird.name === name) {
        if (bird.isClicked === false) {
          this.handleCorrectSelection()
          return { ...bird, isClicked: true }
        } else {
          resetNeeded = true
          return { ...bird, isClicked: false }
        }
      }
      return bird
    });

    if (resetNeeded) {
      this.setState({
        birds: this.shuffle(this.handleIncorrectSelection()),
        messageClass: "incorrect"
      })
    } else {
      this.setState({ birds: this.shuffle(this.handleResetWin(birds))
      })
    }
  ;}

  handleRenderBirds = () => {
    console.log(this.state.birds)
    return this.state.birds.map( (bird) =>
    <Item
      image={bird.image}
      name={bird.name}
      key={bird.id}
      onClick={this.handleShuffleBirds}
      />
      );
  };

  render() {
    return (
      <div className="App">
        <Navbar
          score={this.state.score}
          topscore={this.state.topScore}
          message={this.state.message}
          messageClass={this.state.messageClass}
          />
          <Header />
          <div className="content">
            {this.handleRenderBirds()}
          </div>
      </div>
    );
  };
};

export default App;
import React, { Component, useEffect } from 'react';
import './App.css';
import { maskify } from "./util/maskify";
import { getEspecificParam } from "./util/getparams";
import GridItem from "./util/griditem";

function App() {

  const oculosParam = getEspecificParam('oculos')
  const oculosParamSplited = oculosParam.split(",")

  useEffect(() => {
    maskify(oculosParamSplited)
  }, [])

  return (
    
    <div>
      <main className="content">
        <div className="grid">
          <GridItem />
        </div>
      </main>
    </div>

  );
}

/*
class App extends Component {
  // Initialize state
  state = { passwords: [] }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/url')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  render() {
    const { passwords } = this.state;

    const oculosParam = getEspecificParam('oculos');
    const oculosParamSplited = oculosParam.split(",");
  
    useEffect(() => {
      maskify(['images/overlay-blue-monster.png'])
    }, [])


    return (
      <div className="App">


      <div>
        <main className="content">
          <div className="grid">
            <GridItem />
          </div>
        </main>
      </div>


      <hr />






        {passwords.length ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {passwords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            <button
              className="more"
              onClick={this.getPasswords}>
              Get More
            </button>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}
*/
export default App;

import './App.scss';
import NoScript from 'react-noscript';
import Snackbar from './components/Snackbar'

function App() {
  return (
    <div className="App">
      <NoScript>
        <Snackbar>
          Hey! You're browsing the scriptless version of this site.
        </Snackbar>
      </NoScript>
      <header className="App-header">
        <img src="https://cdn.frankerfacez.com/emoticon/421124/4" className="App-logo" alt="logo" />
        <p>
          Welcome to the Karl Zone
        </p>
        <a
          className="App-link"
          href="https://twitter.com/KarlTheCool"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check me out on Twitter
        </a>
        <a
          className="App-link"
          href="https://github.com/KarlTheCool"
          target="_blank"
          rel="noopener noreferrer"
        >
          Or my Github
        </a>
      </header>
    </div>
  );
}

export default App;

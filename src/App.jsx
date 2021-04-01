import "./App.scss";
import React from "react";
import NoScript from "react-noscript";
import ScriptlessSnackbar from "./components/ScriptlessSnackbar";

function App() {
  return (
    <div className="App">
      <NoScript>
        <ScriptlessSnackbar>
          You&#39;re browsing the scriptless version of this site.
        </ScriptlessSnackbar>
      </NoScript>
      <header>
        <div className="left">
          <a rel="me" href="/">
            Karl Phillips
          </a>
        </div>
        <div className="right">
          <a
            rel="me"
            className="twitter"
            href="https://twitter.com/KarlTheCool"
          >
            Twitter
          </a>
          <a rel="me" className="github" href="https://github.com/KarlTheCool">
            Github
          </a>
          <a rel="me" className="itchio" href="https://karlthecool.itch.io/">
            Itch.io
          </a>
        </div>
      </header>
      <main>
        <p>Hey!</p>
        <p>
          We&#39;re looking pretty bare right now. You should probably come back
          later.
        </p>
        <p>
          Maybe check out my presence on other sites? Links are in the top
          right.
        </p>
      </main>
      <footer />
    </div>
  );
}

export default App;

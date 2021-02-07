import React from 'react';
import './App.css';
import {AppContext} from "./context/app-context";
import {GistService} from "./services/gist-service";
import {OctokitProvider} from "./octokit/provider";
import {AppLayout} from "./components/app-layout";

function App() {
  const context = {
    gistService: new GistService(OctokitProvider.getOctokit())
  };
  return (
    <AppContext.Provider value={context}>
      <div className="App">
        <AppLayout />
      </div>
    </AppContext.Provider>
  );
}

export default App;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Authors from './components/Authors.component';
import Books from './components/Books.component';
import Tabs from './components/Tabs.component';

function App() {
  return (
    <div className="App">
      <Tabs />
      <main>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/books" />}/>
          <Route path="/books" component={Books}/>
          <Route path="/authors" component={Authors}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;

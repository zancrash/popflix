import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import Movies from './main/movies/Movies';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/movies/:movieId' component={Movies} />
          </Switch>
      </div>
    </BrowserRouter>
  )
}
export default App;

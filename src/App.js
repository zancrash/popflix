import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import MoviePage from './main/movies/MoviePage';
import NotFound from './main/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
          <Switch>
            <Route exact path='/popflix' component={Main} />
            <Route path='/movies/:movieId' component={MoviePage} />
            <Route component={NotFound} />
          </Switch>
      </div>
    </BrowserRouter>
  )
}
export default App;

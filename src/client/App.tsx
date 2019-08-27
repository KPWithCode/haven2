import * as React from 'react';
import './scss/app';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import Register from './private/Register';
import Message2 from './public/Message2';
import Login from './private/Login';
import Home from './public/Home';
 


export interface AppProps { }

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/message" component={Message2} />
                    <Route exact path="/login"component={Login} />
                </Switch>
            </Router>
        </BrowserRouter>

    )

}

export default App;


import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import {
   NOT_FOUND_PAGE_PATH,
   NOT_FOUND_PAGE
} from '../constants/NavigationConstants'
import PageNotFound404 from '../components/PageNotFound404'
import ProtectedRoute from '../../TaskManager/components/ProtectedRoute'
import LoginForm from '../../TaskManager/components/LoginForm'
import TrelloHome from '../../TaskManager/components/Home'
import Organization from '../../TaskManager/components/OrganizationBoards'
import BoardDetailedView from '../../TaskManager/components/BoardDetailedView'
import CounterWithToast from './CounterWithToast'
import Home from './Home'
export const routes = (): React.ReactElement => (
   <Router>
      <Switch>
         <Route exact path='/' component={Home} />
         <Route path='/counter' component={CounterWithToast} />
         <Route exact path='/login' component={LoginForm} />
         <ProtectedRoute exact path='/trello/' component={TrelloHome} />
         <ProtectedRoute exact path='/trello/:id' component={Organization} />
         <ProtectedRoute
            exact
            path='/trello/b/:id/:name'
            component={BoardDetailedView}
         />
         <ProtectedRoute
            path={NOT_FOUND_PAGE_PATH}
            key={NOT_FOUND_PAGE}
            component={PageNotFound404}
         />
      </Switch>
   </Router>
)

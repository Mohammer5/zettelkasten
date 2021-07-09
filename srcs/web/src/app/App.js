import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { KastenAdd } from '../kasten-add'
import { KastenList } from '../kasten-list'
import { ZettelList } from '../zettel-list'
import './App.css'
import { Actions } from './filters'
import { Header } from './header'
import { Layout, LayoutAreaContent, LayoutAreaFilters, LayoutAreaHeader } from './layout'

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache(),
})

export const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <LayoutAreaHeader>
        <Header />
      </LayoutAreaHeader>

      <LayoutAreaContent>
        <Router>
          <Switch>
            <Route path="/kasten" exact component={KastenList} />
            <Route path="/kasten/add" exact component={KastenAdd} />
            <Route path="/kasten/:id" exact component={ZettelList} />
            <Route component={() => <Redirect to="/kasten/add" />} />
          </Switch>
        </Router>
      </LayoutAreaContent>

      <LayoutAreaFilters>
        <Actions />
      </LayoutAreaFilters>
    </Layout>
  </ApolloProvider>
)

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { KastenAdd, KastenList } from '../kastens'
import { TagEdit, TagsList } from '../tags'
import { ZettelList } from '../zettels'
import './App.css'
import { Header } from './header'
import { Layout, LayoutAreaContent, LayoutAreaHeader } from './layout'

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
            <Route path="/kastens" exact component={KastenList} />
            <Route path="/kastens/add" exact component={KastenAdd} />
            <Route path="/kastens/:id" exact component={ZettelList} />

            <Route path="/tags" exact component={TagsList} />
            <Route path="/tags/add" exact component={KastenAdd} />
            <Route path="/tags/:id" exact component={TagEdit} />

            <Route path="/sources" exact component={KastenList} />
            <Route path="/sources/add" exact component={KastenAdd} />
            <Route path="/sources/:id" exact component={ZettelList} />

            <Route path="/zettels" exact component={KastenList} />
            <Route path="/zettels/add" exact component={KastenAdd} />
            <Route path="/zettels/:id" exact component={ZettelList} />

            <Route component={() => <Redirect to="/tags" />} />
          </Switch>
        </Router>
      </LayoutAreaContent>
    </Layout>
  </ApolloProvider>
)

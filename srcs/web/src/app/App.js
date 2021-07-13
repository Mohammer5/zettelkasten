import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { KastenAdd, KastenList } from '../kastens'
import { TagEdit, TagList } from '../tags'
import {
  TagCategoryAdd,
  TagCategoryList,
  TagCategoryEdit,
} from '../tag-categories'
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
            <Route path="/kasten" exact component={KastenList} />
            <Route path="/kasten/add" exact component={KastenAdd} />
            <Route path="/kasten/:id" exact component={KastenList} />

            <Route path="/zettels" exact component={ZettelList} />
            <Route path="/zettels/add" exact component={ZettelList} />
            <Route path="/zettels/:id" exact component={ZettelList} />

            <Route path="/tags" exact component={TagList} />
            <Route path="/tags/add" exact component={TagList} />
            <Route path="/tags/:id" exact component={TagEdit} />

            <Route path="/tagCategories" exact component={TagCategoryList} />
            <Route path="/tagCategories/add" exact component={TagCategoryAdd} />
            <Route
              path="/tagCategories/:id"
              exact
              component={TagCategoryEdit}
            />

            <Route component={() => <Redirect to="/tagCategories" />} />
          </Switch>
        </Router>
      </LayoutAreaContent>
    </Layout>
  </ApolloProvider>
)

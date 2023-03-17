import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import NotFound from "./pages/NotFound"

//cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fiealds: {
        clients: {
          merge(existing, incoming) {
            return incoming
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})
// client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
})
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='*'
                element={<NotFound />}
              />
              <Route
                path='/projects/:id'
                element={<Projects />}
              />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App

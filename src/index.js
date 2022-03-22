import React from 'react';
import {render} from 'react-dom';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});


render((
<BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
</BrowserRouter>), document.getElementById('root'));

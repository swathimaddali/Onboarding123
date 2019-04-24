import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';


import FetchSales1 from './components/sales1/FetchSales1';
import FetchCustomer1 from './components/customer1/FetchCustomer1';
import FetchProduct1 from './components/product1/FetchProduct1';
import FetchStore1 from './components/store1/FetchStore1';




export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={FetchCustomer1} />
            <Route path='/fetchCustomer1' component={FetchCustomer1} />     
         
            <Route path='/fetchProduct1' component={FetchProduct1} />
            
            <Route path='/fetchStore1' component={FetchStore1} />
        
            <Route path='/fetchSales1' component={FetchSales1} />
          
      </Layout>
    );
  }
}

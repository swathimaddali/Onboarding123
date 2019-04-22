import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import FetchCustomer from './components/customer/FetchCustomer';
import AddCustomer from './components/customer/AddCustomer';
import CreateCustomer from './components/customer/CreateCustomer';
import FetchProduct from './components/product/FetchProduct';
import AddProduct from './components/product/AddProduct';
import CreateProduct from './components/product/CreateProduct';
import AddStore from './components/store/AddStore';
import FetchStore from './components/store/FetchStore';
import CreateStore from './components/store/CreateStore';
import FetchSales from './components/sales/FetchSales';
import AddSales from './components/sales/AddSales';
import CreateSales from './components/sales/CreateSales';





export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
      
            <Route path='/fetchCustomer' component={FetchCustomer} />
            <Route path='/addcustomer' component={CreateCustomer} />
            <Route path='/customer/edit/:id' component={AddCustomer} />
            <Route path='/fetchProduct' component={FetchProduct} />
            <Route path='/addproduct' component={CreateProduct} />
            <Route path='/product/edit/:id' component={AddProduct} />
            <Route path='/fetchStore' component={FetchStore} />
            <Route path='/addStore' component={CreateStore} />
            <Route path='/store/edit/:id' component={AddStore} />
            <Route path='/fetchSales' component={FetchSales} />
            <Route path='/addsales' component={CreateSales} />
            <Route path='/sales/edit/:id' component={AddSales} />
      </Layout>
    );
  }
}

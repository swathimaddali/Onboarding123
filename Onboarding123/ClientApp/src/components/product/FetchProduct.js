import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import ProductGridTable from './ProductGridTable';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { Button, Container, Modal, Header, Icon } from 'semantic-ui-react';


class FetchProduct extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            tocreate: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ tocreate: true });


       
    }


    render() {
        if (this.state.tocreate === true) {

            return <Redirect to='/addproduct' />
        }
      
        return (
            <Fragment>
                <div class='divpad'>  <Button  color="blue" onClick={this.handleSubmit}>Create New Product</Button></div>
                <ProductGridTable dataUrl="Product/Index" />
            </Fragment>
        );
    }
}
export default withRouter(FetchProduct);

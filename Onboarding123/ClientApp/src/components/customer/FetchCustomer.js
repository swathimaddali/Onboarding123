import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import CustomerGridTable from './CustomerGridTable';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';



class FetchCustomer extends React.Component {
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

            return <Redirect to='/addcustomer' />
        }
        
        return (
            <Fragment>
                <div className='divpad'>  <Button className="btn btn-primary" onClick={this.handleSubmit}>Create New Customer</Button></div>
                <CustomerGridTable dataUrl="Customer/Index" />
            </Fragment>
        );
        
        
    }
}
export default withRouter(FetchCustomer);

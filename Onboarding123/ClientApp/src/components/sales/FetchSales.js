import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import SalesGridTable from './SalesGridTable';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';

import { Button, Container, Modal, Header, Icon } from 'semantic-ui-react';


class FetchSales extends React.Component {
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
      
        console.log("inside store::render");
        if (this.state.tocreate === true) {

            return <Redirect to='/addsales' />
        }
        return (
            <Fragment>            

                <div className="divpad">  <Button color="blue" onClick={this.handleSubmit}> New Sales </Button></div>
                    <SalesGridTable dataUrl="Sales/Index" />
                                 
            </Fragment>
        );
    }
}
export default withRouter(FetchSales);



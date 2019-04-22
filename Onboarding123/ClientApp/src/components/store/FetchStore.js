import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import StoreGridTable from './StoreGridTable';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { Button, Container, Modal, Header, Icon } from 'semantic-ui-react';




class FetchStore extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            tocreate: false,
            active: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);



    }
    onCloseModal() {
        this.setState({
            active: false
        });
    }

    handleOpen = () => { this.setState({ modalOpen: true }); }

    handleClose() { this.setState({ modalOpen: false }); }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({ tocreate: true });

        const pth = '/addstore';

    }


    render() {
        if (this.state.tocreate === true) {

            return <Redirect to='/addstore' />
        }
        console.log("inside store::render");
        return (
            <Fragment>


                <Container>

                    <div class="divpad">  <Button color="blue" onClick={this.handleSubmit}>Create New Store </Button></div>
                    <StoreGridTable dataUrl="Store/Index" />
                </Container>

            </Fragment>
        );
    }
}
export default withRouter(FetchStore);



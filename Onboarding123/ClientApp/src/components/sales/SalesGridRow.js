import React from "react";
import $ from 'jquery';
import { RouteComponentProps } from 'react-router';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect} from 'react-router-dom';  
import { Button, Modal } from 'react-bootstrap';






class SalesGridRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete1 = this.handleDelete1.bind(this);
        this.handleClose = this.handleClose.bind(this);
     
      
       
    }

    handleDelete(e, id) {
        console.log("id" + id);
        e.preventDefault();

        console.log("calling ajax");

        fetch('Sales/Delete/' + id, {
            method: 'DELETE'

        }).then((resp) => {
            console.log("successfully deleted row" + resp);
            this.setState({ show: false });
            window.location.reload();

        }).catch((error) => {
            console.log("error" + error);
        });

       
       // this.props.history.push("/fetchSales");

        e.stopPropagation();
    }

    handleDelete1(e, id) {
        this.setState({ show: true });
        console.log("this.state.show" + this.state.show);

    }

    handleClose() {
        this.setState({ show: false });
        this.props.history.push("/fetchSales");
    }

    
    handleEdit(e, id) {
       
        e.preventDefault();
        console.log("edit id " + id);    
        const paath = '/sales/edit/' + id;      
       // eslint-disable-next-line
        console.log("this.props.history" + this.props.history);
        this.props.history.push(paath);
    }  

            
        
     


    render(){
     
        return (
        

            <tr>
                <td>{this.props.item.customername}</td>
                <td>{this.props.item.productname}</td>
                <td>{this.props.item.storename}</td>
                <td>{this.props.item.dateSold}</td>
                <td>
                    <Button className="btn btn-warning" onClick={(e) => this.handleEdit(e, this.props.item.id)}> <span class="glyphicon glyphicon-pencil"></span> Edit</Button>
                </td>
                <td>
                    <Button className="btn btn-danger" onClick={(e) => this.handleDelete1(e, this.props.item.id)}><span class="glyphicon glyphicon-trash"></span> Delete </Button>
                    <div>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Sales</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div> Are you sure?</div>




                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-dark" variant="secondary" onClick={this.handleClose}>
                                    Cancel
            </Button>
                                <Button className="btn btn-danger" variant="primary" onClick={(e) => this.handleDelete(e, this.props.item.id)}>
                                    delete<span class="glyphicon glyphicon-close"></span>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>



                </td>

            </tr>





        );
    }



}
export default withRouter(SalesGridRow);
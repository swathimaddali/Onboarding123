
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect} from 'react-router-dom';
import $ from 'jquery';

import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import './Customer.css';




class CreateCustomer extends React.Component {
    constructor(props) {
        super(props);
;

        this.state = {
           
            name: '',
            address:'',
            loading: false,
            showc: true,
        }

        
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);     
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    //added new
    handleClose() {
        this.setState({ showc: false });
        this.props.history.push("/fetchCustomer");
    }

  
    //added new
    handleChange(event) {

        console.log("inside change event.target.name::" + event.target.name + "event.target.value::" + event.target.value);
        //
        this.setState({ [event.target.name]: event.target.value });

        // this.setState({ productname: event.target.value }, function () { console.log("is it changed noww" + this.state.productname); });

    }

   



    // This will handle the submit form event.  
    handleSave = (event) => {
        console.log("inside handleSave" + this.state.name);
        event.preventDefault();
        this.setState({ loading: true });
 
        /*for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            console.log("formData[formElementIdentifier] " + formData[formElementIdentifier]); //2
        }*/

    
        var formData = {
            Name: this.state.name,
            Address:this.state.address
        }
        console.log("formData " + formData);
        console.log("formData stringisy" + JSON.stringify(formData));
       
        var form = $("#myform").serialize();
        console.log("myform serialize" + form);
        var strng = this.state.name;


        var cust = new Object();
        cust.Name = this.state.name;
        cust.Address = this.state.address;
        console.log("cust obj " + JSON.stringify(cust));
        var ddt = { Name: this.state.name, Address: this.state.address };
        var jsondt = JSON.stringify(ddt);

        if (cust != null) {
           

            var formData = {
                Name: this.state.name,
                Address: this.state.address
            }

            var formBody = [];
            for (var property in formData) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('Customer/Create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then((resp) => {
                console.log("success"+resp);
                this.props.history.push("/fetchCustomer");
                }).catch((error) => {
                    console.log("error" + error);
                });



        }
 
        }

    

    // Returns the HTML Form to the render() method.  
  
    renderCreateForm() {

   

        return (
            /*
            <form  id="myform" onSubmit={this.handleSave}>
                <br />
                Name: <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChangenm}
                /> <br/>
                Address: <input
                    type="text"
                    value={this.state.address}
                    onChange={this.handleChangeadd}
                /><br /><br />

                <button type="submit" >Save</button>
            </form>
            */
            <div>
            <Modal show={this.state.showc} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        <form id="myform" onSubmit={this.handleSave}>
                                <br />

                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                                    <div className="col-md-4">
                                        <input className="form-control" type="text" name="name"  value={this.state.name}    onChange={this.handleChange} />
                                    </div>
                                </div >

                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Address">Address</label>
                                    <div className="col-md-4">
                                        <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                                    </div>
                                </div >
                           
                        </form>
                    </div>





                </Modal.Body>
                <Modal.Footer>
                    
                     
                        <Button className="cancel" variant="secondary" onClick={this.handleClose}>  
                            Cancel <span class="glyphicon glyphicon-remove"></span>
                    </Button>
                        <Button className="btn btn-success" variant="primary" onClick={this.handleSave}>  
                            Create <span class="glyphicon glyphicon-ok"></span>
                    </Button>
                </Modal.Footer>
            </Modal>
            </div >
                );




}

    render() {
       
       

        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();


        return (
            <div >
                {contents} 
            </div>
        
        );


        
       
    }





    











}
export default CreateCustomer;
﻿
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';


 class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            loading: true, proddata: [],
            show: true,
            errors: {}
        };

        
        var prodid = this.props.match.params["id"];
        console.log("this.props.match.params id" + prodid);
     
        // GET https://localhost:44394/Customer/Details/2 404
                $.getJSON('Product/Details/' + prodid, function (data) {

                console.log("lin 21"+JSON.stringify(data));
                //{"id":2,"name":"Swati","address":"512 Princes Highway NSW","sales":[]}

                    this.setState({ loading: false, proddata: data, price: data.price, name: data.name }
                         
                    );

            }.bind(this));


        console.log("this.state.salesdata line 29" + JSON.stringify(this.state.custdata ));
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.Change = this.Change.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidation = this.handleValidation.bind(this);

    }



    
     Change(event) {

         console.log("inside change event.target.name::" + event.target.name + "event.target.value::" + event.target.value);
         //
         this.setState({ [event.target.name]: event.target.value });

         // this.setState({ productname: event.target.value }, function () { console.log("is it changed noww" + this.state.productname); });

     }
     handleValidation() {
         console.log("inside handlevalidation");
         let name = this.state.name;
         let price = this.state.price;
         let errors = {};
         let formIsValid = true;
         if (!name) {
             formIsValid = false;
             errors["name"] = "Name cannot be empty";
         }
         if (!price) {
             formIsValid = false;
             errors["price"] = "Price cannot be empty";
         } else if (isNaN(price)) {
             formIsValid = false;
             errors["price"] = "Price should be numeric";
         }

         this.setState({ errors: errors });
         return formIsValid;
     }


     handleClose() {

         this.setState({ show: false });
         this.props.history.push("/fetchProduct");
     }

    


    // This will handle the submit form event.  
         handleSave(event) {
        event.preventDefault();
             const data = new FormData(event.target);


             if (this.handleValidation()) {
                 // alert("Form submitted");
             } else {
                 this.setState({ loading: false });
                 return;
             }
               
             if (this.state.proddata.id) {
                 console.log("calling ajax");
                

                 var formData = {
                     id: this.state.proddata.id,
                     Name: this.state.name,
                     Price: this.state.price
                 }

                 var formBody = [];
                 for (var property in formData) {
                     var encodedKey = encodeURIComponent(property);
                     var encodedValue = encodeURIComponent(formData[property]);
                     formBody.push(encodedKey + "=" + encodedValue);
                 }
                 formBody = formBody.join("&");

                 fetch('Product/Edit/' + this.state.proddata.id, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                     },
                     body: formBody
                 }).then((resp) => {
                     console.log("success" + resp);
                     this.props.history.push("/fetchProduct");
                 }).catch((error) => {
                     console.log("error" + error);
                 });








             }
       
  
    }
    // This will handle Cancel button click event.  
     handleCancel(e) {
        e.preventDefault();
         this.props.history.push("/fetchProduct");
    }


    // Returns the HTML Form to the render() method.  
     renderCreateForm() {
        




             

         console.log("inside addcustomer:::cust data is " + JSON.stringify(this.state.proddata));
        console.log("inside addcustomer:: renderCreateForm");
         return (
             <div>
                 <Modal show={this.state.show} onHide={this.handleClose}>
                     <Modal.Header closeButton>
                         <Modal.Title>Edit Product</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>

                         <div>

                             <form onSubmit={this.handleSave} >
                                 <div className="form-group row" >
                                     <input type="hidden" name="id" value={this.state.proddata.id} />
                                 </div>
                                 < div className="form-group row" >
                                     <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                                     <div className="col-md-4">
                                         <input className="form-control" type="text" name="name" autoComplete="off" defaultValue={this.state.proddata.name} required onChange={this.Change} />
                                         <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                     </div>
                                 </div >
                                 < div className="form-group row" >
                                     <label className=" control-label col-md-12" htmlFor="Price">Price</label>
                                     <div className="col-md-4">
                                         <input className="form-control" type="text" name="price" autoComplete="off" defaultValue={this.state.proddata.price} required onChange={this.Change} />
                                         <span style={{ color: "red" }}>{this.state.errors["price"]}</span>
                                     </div>
                                 </div >


                               
                             </form >



                         </div>





                     </Modal.Body>
                     <Modal.Footer>


                         <Button className="cancel" variant="secondary" onClick={this.handleClose}>
                             Cancel <span class="glyphicon glyphicon-remove"></span>
                         </Button>
                         <Button className="btn btn-success" variant="primary" onClick={this.handleSave}>
                             Edit <span class="glyphicon glyphicon-ok"></span>
                         </Button>
                     </Modal.Footer>
                 </Modal>
             </div >
           
        )
     }


     render() {
         let contents = this.state.loading
             ? <p><em>Loading...</em></p>
             : this.renderCreateForm();

         return(
             <div>  {contents}  </div>
         );
     }

}
export default AddProduct;
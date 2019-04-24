
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';



 class AddCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            loading: true, custdata: [],
            show: true,
            errors: {}
        };

        
        var custid = this.props.match.params["id"];
        console.log("this.props.match.params id" + custid);
     
        // GET https://localhost:44394/Customer/Details/2 
            $.getJSON('Customer/Details/'+ custid, function (data) {

                console.log("lin 21"+JSON.stringify(data));
                //{"id":2,"name":"Swati","address":"512 Princes Highway NSW","sales":[]}

                this.setState({ loading: false, custdata: data, address: data.address, name: data.name});

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
         let address = this.state.address;
         let errors = {};
         let formIsValid = true;
         if (!name) {
             formIsValid = false;
             errors["name"] = "Name cannot be empty";
         }
         if (!address) {
             formIsValid = false;
             errors["address"] = "Address cannot be empty";
         }

         this.setState({ errors: errors });
         console.log(this.state.errors["name"]);
         return formIsValid;
     }

     

    
     //added new
     handleClose() {
    
         this.setState({ show: false });
         this.props.history.push("/fetchCustomer");
     }
   

    // This will handle the submit form event.  
     handleSave = (event) => {
        event.preventDefault();
             const data = new FormData(event.target);
         console.log("handlesave:::data");
             // PUT request for Edit employee.  

         if (this.handleValidation()) {
             // alert("Form submitted");
         } else {
             this.setState({ loading: false });
             return;
         }


          

             if (this.state.custdata.id) {
                 console.log("calling ajax");
        


                 var formData = {
                     id: this.state.custdata.id,
                     Name: this.state.name,
                     Address: this.state.address,
                     
                 }
                 console.log("formdata" + formData);
                 var formBody = [];
                 for (var property in formData) {
                     var encodedKey = encodeURIComponent(property);
                     var encodedValue = encodeURIComponent(formData[property]);
                     formBody.push(encodedKey + "=" + encodedValue);
                 }
                 formBody = formBody.join("&");

                 fetch('Customer/Edit/'+this.state.custdata.id, {
                     method: 'PUT',
                     headers: {
                         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                     },
                     body: formBody
                 }).then((resp) => {
                     console.log("success" + resp);
                     this.props.history.push("/fetchCustomer");
                 }).catch((error) => {
                     console.log("error" + error);
                 });








             }
       
  
    }
 

    // Returns the HTML Form to the render() method.  
     renderCreateForm() {
         console.log("inside addcustomer:::cust data is " + JSON.stringify(this.state.custdata));
        console.log("inside addcustomer:: renderCreateForm");
         return (

             <div>
                 <Modal show={this.state.show} onHide={this.handleClose}>
                     <Modal.Header closeButton>
                         <Modal.Title>Edit Customer</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>

                         <div>

                             <form onSubmit={this.handleSave} >
                                 <div className="form-group row" >
                                     <input type="hidden" name="id" value={this.state.custdata.id} />
                                 </div>
                                 < div className="form-group row" >
                                     <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                                     <div className="col-md-4">
                                         <input className="form-control" type="text" autoComplete="off" name="name" defaultValue={this.state.custdata.name} required onChange={this.Change} />
                                         <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                     </div>
                                 </div >
                                 < div className="form-group row" >
                                     <label className=" control-label col-md-12" htmlFor="Address">Address</label>
                                     <div className="col-md-4">
                                         <input className="form-control" type="text" name="address" autoComplete="off" defaultValue={this.state.custdata.address} required onChange={this.Change} />
                                         <span style={{ color: "red" }}>{this.state.errors["address"]}</span>

                                     </div>
                                 </div >


                                 
                             </form >




                             
                         </div>





                     </Modal.Body>
                     <Modal.Footer>


                         <Button className="btn btn-dark" variant="secondary" onClick={this.handleClose}>
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
export default AddCustomer;
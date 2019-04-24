
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect} from 'react-router-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';



class CreateProduct extends React.Component {
    constructor(props) {
        super(props);
        ;

        this.state = {

            name: '',
            price: '',
            loading: false,
            showc: true,
            errors: {}
        }


        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleChange(event) {

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
        }else  if (isNaN(price)) {
            formIsValid = false;
            errors["price"] = "Price should be numeric";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }



    // This will handle the submit form event.  
    handleSave = (event) => {
        console.log("inside handleSave" + this.state.name);
        event.preventDefault();



        if (this.handleValidation()) {
            // alert("Form submitted");
        } else {
            this.setState({ loading: false });
            return;
        }


        this.setState({ loading: true });    
    

       
            var formData = {
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

            fetch('Product/Create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then((resp) => {
                console.log("success"+resp);
                this.props.history.push("/fetchProduct");
                }).catch((error) => {
                    console.log("error" + error);
                });



        
 
        }

    



    handleClose() {
        this.setState({ showc: false });
        this.props.history.push("/fetchProduct");
    }


    // Returns the HTML Form to the render() method.  
  
    renderCreateForm() {

   

        return (
            
            <div>
                <Modal show={this.state.showc} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div>
                            <form id="myform" onSubmit={this.handleSave}>
                                <br />

                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                                    <div className="col-md-4">
                                        <input className="form-control" type="text" autoComplete="off" name="name" value={this.state.name} onChange={this.handleChange} />
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                    </div>
                                </div >

                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Price">Price</label>
                                    <div className="col-md-4">
                                        <input className="form-control" type="text" name="price" autoComplete="off" value={this.state.price} onChange={this.handleChange} />
                                        <span style={{ color: "red" }}>{this.state.errors["price"]}</span>
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



        )
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
export default CreateProduct;
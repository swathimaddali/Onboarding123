
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, Redirect } from 'react-router-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';

class CreateSales extends React.Component {
    constructor(props) {
        super(props);
        

        this.state = {

            loading: true,
            proddata: [],
            productname: '',
            dateSold: '',
            customername: '',
            storename: '',
            showc: true,
            errors: {}
        }


        $.getJSON('Sales/Create/', function (data) {

            console.log("Add Sales" + JSON.stringify(data));


            this.setState({loading:false, proddata: data },  ()=> {
                console.log("Add Salessalesdata" + JSON.stringify(this.state.proddata));

            });

          }.bind(this));




        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
     
    }

    /*componentDidMount() {

        console.log("component did mount" + this.state.proddata);


    }*/
   
    handleChange(event) {

        console.log("inside change event.target.name::" + event.target.name + "event.target.value::" + event.target.value);
        //
        this.setState({ [event.target.name]: event.target.value });

        // this.setState({ productname: event.target.value }, function () { console.log("is it changed noww" + this.state.productname); });

    }

    handleValidation() {
        console.log("inside handlevalidation");
        let cname = this.state.customername;
        let pname = this.state.productname;
        let store = this.state.storename;
        let date = this.state.dateSold;
        let re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        let regs = [];
        let minyear = 1902;
        let maxyear = (new Date()).getFullYear();
     //   let re = /^\[0-3]?[0-9]\/[01]?[0-9]\/[12][90][0-9][0-9]$/;

        let errors = {};
        let formIsValid = true;
        if (!cname) {
            formIsValid = false;
            errors["customername"] = "Please select Customer";
        }
        if (!pname) {
            formIsValid = false;
            errors["productname"] = "Please select Product";
        }
        if (!store) {
            formIsValid = false;
            errors["storename"] = "Please select Store";
        }
        if ((!date) || !(date).match(re))
        {
            formIsValid = false;
            errors["dateSold"] = "Date is not valid. Enter in format DD/MM/YYYY";
        } else  if (regs = ((date).match(re)[0])) {
            console.log("regs" + regs);
            let arr = regs.split("/");
            if (arr[0] < 1 || arr[0] > 31)
                errors["dateSold"] = "Date is not valid";
           else if (arr[1] < 1 || arr[1] > 12)
                errors["dateSold"] = "Month is not valid";
            else if (arr[2] < minyear || arr[2] > maxyear)
                errors["dateSold"] = "Year is not valid";

        }
          

        this.setState({ errors: errors });
   
        return formIsValid;
    }


    handleSave(event) {

        event.preventDefault();
        console.log("inside save");

        if (this.handleValidation()) {
            // alert("Form submitted");
        } else {
            this.setState({ loading: false });
            return;
        }

            this.setState({ loading: true });

      


            var formData = {
               
                Customername: this.state.customername,
                Productname: this.state.productname,
                Storename: this.state.storename,
                DateSold: this.state.dateSold,


            }
            console.log("save:::" + JSON.stringify(formData));


            var formBody = [];
            for (var property in formData) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");



        fetch('Sales/Create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        }).then((resp) => {
            console.log("success" + resp);
            this.props.history.push("/fetchSales");
        }).catch((error) => {
            console.log("error" + error);
        });
          


        
    }





    // This will handle Cancel button click event.  


    handleClose() {
        this.setState({ showc: false });
        this.props.history.push("/fetchSales");
    }


    // Returns the HTML Form to the render() method.  

    renderCreateForm() {
     //   this.setState((prevState) => { return { proddata: prevState.count-1}})
            var custnames = (this.state.proddata.custNames);
            var prodnames = (this.state.proddata.prodNames);
            var storenames = (this.state.proddata.storeNames);

            var i = 1;
            //["Mobile","Talet","ear"]
            var MakeItem = function (X) {
                return <option key={i++} value={X}>{X}</option>;

            }

            return (

                



                <div>
                    <Modal show={this.state.showc} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Sales</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div>
                                < form onSubmit={this.handleSave} >
                                    <div className="form-group row" >
                                        <input type="hidden" name="id" />
                                    </div>
                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Date">Date sold</label>
                                        <div className="col-md-4">
                                            <input className="form-control" type="text" name="dateSold" autoComplete="off" onChange={this.handleChange} required />
                                            <span style={{ color: "red" }}>{this.state.errors["dateSold"]}</span>
                                        </div>
                                    </div >
                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Customer">Customer</label>
                                        <div className="col-md-4">

                                            <select name="customername" onChange={this.handleChange} ><option value="">select </option> => {custnames.map(MakeItem)}</select>
                                            <span style={{ color: "red" }}>{this.state.errors["customername"]}</span>
                                        </div>
                                    </div>

                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Product">Product</label>
                                        <div className="col-md-4">

                                            <select name="productname" onChange={this.handleChange} ><option value="">select </option>=> {prodnames.map(MakeItem)}</select>
                                            <span style={{ color: "red" }}>{this.state.errors["productname"]}</span>

                                        </div>
                                    </div>
                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Store">Store</label>
                                        <div className="col-md-4">

                                            <select name="storename" onChange={this.handleChange} ><option value="">select </option> => {storenames.map(MakeItem)}</select>
                                            <span style={{ color: "red" }}>{this.state.errors["storename"]}</span>
                                        </div>
                                    </div>



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
export default CreateSales;
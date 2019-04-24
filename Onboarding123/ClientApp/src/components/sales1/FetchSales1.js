import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import $ from 'jquery';



class FetchSales1 extends React.Component {
    constructor(props) {
        console.log("inside customer constructor");
        super(props);



        this.state = {
            items: [],
            loading: true,
            showd: false,
            salesdata: [],
            errors: {},
            showe: false,
            productname: '',
            dateSold: '',
            customername: '',
            storename: '',
            showc: false,
            id:'',

        };

        //console.log("inside customer componentDidMount");  
        $.getJSON('Sales/Index', function (data) {
            this.setState({ loading: false, items: data }, function () { console.log("items loaded in constructor"+this.state.items); });
        }.bind(this));     

        this.handleSave = this.handleSave.bind(this);
        this.Change = this.Change.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        

    }

    componentDidMount() {
    
        $.getJSON('Sales/Create/', function (data) {

            console.log("Add Sales" + JSON.stringify(data));


            this.setState({ loading: false, salesdata: data }, () => {
                console.log("Add Salessalesdata" + JSON.stringify(this.state.salesdata));

            });

        }.bind(this));
       
    }  

    //handle onchange for edit and create forms

    Change(event) {      
        this.setState({ [event.target.name]: event.target.value });     

    }

    //validations on edit and create forms
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
        if ((!date) || !(date).match(re)) {
            formIsValid = false;
            errors["dateSold"] = "Date is not valid. Enter in format DD/MM/YYYY";
        } else if (regs = ((date).match(re)[0])) {
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


    //close all modals
    handleClose() {        
        this.setState({ showd: false , showe:false ,showc:false});        
    }

    //handle edit modal invoke
    handleEdit(e, d) {
        e.preventDefault();
        console.log("inside handle edit" + d.customername + d.id);
        this.setState({ showe: true, id: d.id, customername: d.customername, productname: d.productname, storename: d.storename, dateSold: d.dateSold });
        //call fetch to get specific details


    }

    //submit Edit form
    handleSave = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.handleClose();            

            var formData = {
              

                 Id: this.state.custdata.id,
                Customername: this.state.customername,
                Productname: this.state.productname,
                Storename: this.state.storename,
                DateSold: this.state.dateSold,
            }
          
            var formBody = [];
            for (var property in formData) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('Sales/Edit/' + this.state.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                body: formBody
            }).then(resp => resp.json().then(data => { console.log("response" + JSON.stringify(data));
                this.setState({ items: data }, function () { console.log("success" + console.log(this.state.items));});
                //console.log("success" + console.log(this.state.items));
              })).catch((error) => {
                console.log("error" + error);
            });

        } else {
            this.setState({ loading: false });
            return;
        }

    }

   


     

    //handle create modal invoke
    handleCreate1(e) {
        e.preventDefault();
        this.setState({ showc: true ,name:'', price:'' });
    }

      //submit Craete form
    handleCreate = (event) => {
            event.preventDefault();
            if (this.handleValidation()) {
                this.handleClose();            
                var formData = {


            
                    Customername: this.state.customername,
                    Productname: this.state.productname,
                    Storename: this.state.storename,
                    DateSold: this.state.dateSold,
                }

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
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    body: formBody
                }).then(resp => resp.json().then(data => {

                    this.setState({ items: data, customername: '', productname: '', storename: '', dateSold:'' }, function () { console.log("success" + console.log(this.state.items)); });
                    //console.log("success" + console.log(this.state.items));
                }))

                    .catch((error) => {
                        console.log("error" + error);
                    });
            } else {
                this.setState({ loading: false });
                return;
            }

        }

    //  //handle Delete modal invoke    
    
    handleDelete1(e) {
        e.preventDefault();
        this.setState({ showd: true });
    }

    //handle delete submit
    handleDelete(e, d) {
        e.preventDefault();
        this.handleClose();       

        fetch('Sales/Delete/' + d.id, {
            method: 'DELETE'
        }).then(resp => resp.json().then(data => {
            this.setState({ items: data }, function () { console.log("successfully deleted" + console.log(this.state.items)); });        
        })).catch((error) => {
            console.log("error" + error);
        });
    }
    
    //display rows
renderCreateForm(d, i) {


        console.log("custames" + custnames + "prodnames" + prodnames + "storenames" + storenames);
        var custnames = (this.state.salesdata.custNames);
        var prodnames = (this.state.salesdata.prodNames);
        var storenames = (this.state.salesdata.storeNames);

        var i = 1;
        //["Mobile","Talet","ear"]
        var MakeItem = function (X) {
            return <option key={i++} value={X}>{X}</option>;

        }

    

        return (
            <tr key={i}>
                
                <td>{d.customername}</td>
                <td>{d.productname}</td>
                <td>{d.storename}</td>
                <td>{d.dateSold}</td>
                <td>
                 <Button className="btn btn-warning" onClick={(e) => this.handleEdit(e, d)}>
                        <span class="glyphicon glyphicon-pencil"></span> Edit</Button>
                    <div>
                        
                            <Modal show={this.state.showe} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Sales</Modal.Title>
                                </Modal.Header>
                            <Modal.Body>
                             
                            
                        <div>

                            <form onSubmit={this.handleSave}>
                                <div className="form-group row" >
                                    <input type="hidden" name="id" />
                                </div>
                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Date">Date sold</label>
                                    <div className="col-md-4">
                                        <input className="form-control" type="text" name="dateSold" autoComplete="off" onChange={this.Change} defaultValue={this.state.dateSold} required />
                                        <span style={{ color: "red" }}>{this.state.errors["dateSold"]}</span>
                                    </div>
                                </div >
                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Customer">Customer</label>
                                    <div className="col-md-4">

                                        <select name="customername" onChange={this.Change} value={this.state.customername}> => {custnames.map(MakeItem)}</select>
                                        <span style={{ color: "red" }}>{this.state.errors["customername"]}</span>
                                    </div>
                                </div>
                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Product">Product</label>
                                    <div className="col-md-4">

                                        <select name="productname" onChange={this.Change} value={this.state.productname}> => {prodnames.map(MakeItem)}</select>
                                        <span style={{ color: "red" }}>{this.state.errors["productname"]}</span>
                                    </div>
                                </div>
                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Store">Store</label>
                                    <div className="col-md-4">

                                        <select name="storename" onChange={this.Change} value={this.state.storename}> => {storenames.map(MakeItem)}</select>
                                        <span style={{ color: "red" }}>{this.state.errors["storename"]}</span>
                                    </div>
                                </div>

                            </form >
                        </div>

                            </Modal.Body>
                            <Modal.Footer>


                                <Button className="cancel" variant="secondary" onClick={this.handleClose}>
                                    Cancel <span class="glyphicon glyphicon-remove"></span>
                                </Button>
                                <Button className="btn btn-success" variant="primary" onClick={this.handleCreate}>
                                    Edit <span class="glyphicon glyphicon-ok"></span>
                                </Button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </td>
                <td>
                    <Button className="btn btn-danger" onClick={(e) => this.handleDelete1(e)}><span class="glyphicon glyphicon-trash"></span> Delete </Button>

                    <div>
                        <Modal show={this.state.showd} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Sales</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>  <div> Are you sure?</div>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-dark" variant="secondary" onClick={this.handleClose}>
                                    Cancel
                           </Button>
                                <Button className="btn btn-danger" variant="primary" onClick={(e) => this.handleDelete(e, d)}>
                                    delete<span class="glyphicon glyphicon-close"></span>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>




                 </td>
             </tr>
        );
    }

    //react render function

    render() {
        
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderForm();
        return (
            <div>  {contents}  </div>
        );
    }

    //Table display with Create button

    renderForm() {
        console.log("inside customer  render");
        var rows = [];
        let jsonRet = this.state.items;
        console.log("inside customer  jsonRet" + jsonRet.length);
        if( (this.state.items.length == 0)|| (jsonRet.length==0)){ }
        else {

            var custnames = (this.state.salesdata.custNames);
            var prodnames = (this.state.salesdata.prodNames);
            var storenames = (this.state.salesdata.storeNames);
            var i = 1;
            //["Mobile","Talet","ear"]
            var MakeItem = function (X) {
                return <option key={i++} value={X}>{X}</option>;

            }



            return (

                <Fragment>
                    <div className='divpad'>  <Button className="btn btn-primary" onClick={(e) => this.handleCreate1(e)}> Create New Sales</Button>
                        <div>
                           
                        
                                <Modal show={this.state.showc} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Create Sales</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div>
                                        < form onSubmit={this.handleCreate} >
                                                <div className="form-group row" >
                                                    <input type="hidden" name="id" />
                                                </div>
                                                < div className="form-group row" >
                                                    <label className=" control-label col-md-12" htmlFor="Date">Date sold</label>
                                                    <div className="col-md-4">
                                                        <input className="form-control" type="text" name="dateSold" autoComplete="off" onChange={this.Change} required />
                                                    <br /> <span style={{ color: "red" }}>{this.state.errors["dateSold"]}</span>
                                                    </div>
                                                </div >
                                                < div className="form-group row" >
                                                    <label className=" control-label col-md-12" htmlFor="Customer">Customer</label>
                                                    <div className="col-md-4">

                                                        <select name="customername" onChange={this.Change} ><option value="">select </option> => {custnames.map(MakeItem)}</select>
                                                       <span style={{ color: "red" }}>{this.state.errors["customername"]}</span>
                                                    </div>
                                                </div>

                                                < div className="form-group row" >
                                                    <label className=" control-label col-md-12" htmlFor="Product">Product</label>
                                                    <div className="col-md-4">

                                                        <select name="productname" onChange={this.Change} ><option value="">select </option>=> {prodnames.map(MakeItem)}</select>
                                                    <span style={{ color: "red" }}>{this.state.errors["productname"]}</span>

                                                    </div>
                                                </div>
                                                < div className="form-group row" >
                                                    <label className=" control-label col-md-12" htmlFor="Store">Store</label>
                                                    <div className="col-md-4">

                                                        <select name="storename" onChange={this.Change} ><option value="">select </option> => {storenames.map(MakeItem)}</select>
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
                                        <Button className="btn btn-success" variant="primary" onClick={this.handleCreate}>
                                            Create <span class="glyphicon glyphicon-ok"></span>
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div >
                        </div >

                    
                    <div>
                        <table className="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Product</th>
                                    <th>Store</th>
                                    <th>Date Sold</th>
                                    <th>Action</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {jsonRet.map((d, i) => this.renderCreateForm(d, i))}
                            </tbody>
                        </table>

                    </div>
                </Fragment>
            );
        }


    }
}
export default withRouter(FetchSales1);


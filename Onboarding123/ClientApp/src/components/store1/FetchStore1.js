import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter, Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import $ from 'jquery';



class FetchStore1 extends React.Component {
    constructor(props) {
        console.log("inside customer constructor");
        super(props);

        this.state = {
            items: [],
            loading: true,
            showd: false,
            custdata: [],
            errors: {},
            showe: false,
            name: '',
            address: '',
            showc: false,

        };
        this.handleSave = this.handleSave.bind(this);
        this.Change = this.Change.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.handleDelete = this.handleDelete.bind(this);       
        

    }

    componentDidMount() {
        //console.log("inside customer componentDidMount");  
        $.getJSON('Store/Index', function (data) {
            this.setState({ loading: false, items: data }, function () { console.log(this.state.items); });
        }.bind(this));     
        
    }  

    //handle onchange for edit and create forms

    Change(event) {      
        this.setState({ [event.target.name]: event.target.value });     

    }

    //validations on edit and create forms

   
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

    //close all modals
    handleClose() {        
        this.setState({ showd: false , showe:false ,showc:false});        
    }


    //submit Edit form
    handleSave = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.handleClose();            

            var formData = {
                id: this.state.custdata.id,
                Name: this.state.name,
                Address: this.state.address,
            }
          
            var formBody = [];
            for (var property in formData) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(formData[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('Store/Edit/' + this.state.custdata.id, {
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

    //handle edit modal invoke
    handleEdit(e, d) {
        e.preventDefault();
        this.setState({ showe: true, custdata: d, name: d.name, address:d.address }, function () {
            console.log("show" + this.state.showe + "custdata" + this.custdata);           
        });       
    }  
    //handle create modal invoke
    handleCreate1(e) {
        e.preventDefault();
        this.setState({ showc: true ,name:'', address:'' });
    }

      //submit Craete form
    handleCreate = (event) => {
            event.preventDefault();
            if (this.handleValidation()) {
                this.handleClose();            
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

                fetch('Store/Create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    body: formBody
                }).then(resp => resp.json().then(data => {
               
                    this.setState({ items: data }, function () { console.log("success" + console.log(this.state.items)); });
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

        fetch('Store/Delete/' + d.id, {
            method: 'DELETE'
        }).then(resp => resp.json().then(data => {
            this.setState({ items: data }, function () { console.log("successfully deleted" + console.log(this.state.items)); });        
        })).catch((error) => {
            console.log("error" + error);
        });
    }
    
    //display rows
    renderCreateForm(d,i) {
   
        return (
            <tr key={i}>
                <td>{d.name}</td>
                <td>{d.address}</td>
                <td>
                    <Button className="btn btn-warning" onClick={(e) => this.handleEdit(e, d)}> <span class="glyphicon glyphicon-pencil"></span> Edit</Button>
                    
                      <div>
                        <Modal show={this.state.showe} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Store</Modal.Title>
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
                                                    <input className="form-control" type="text" name="name" defaultValue={this.state.custdata.name} autoComplete="off" onChange={this.Change} />
                                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                                </div>
                                            </div >
                                            < div className="form-group row" >
                                                <label className=" control-label col-md-12" htmlFor="Address">Address</label>
                                                <div className="col-md-4">
                                                    <input className="form-control" type="text" name="address" defaultValue={this.state.custdata.address} autoComplete="off" onChange={this.Change} />
                                                    <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
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
                        </div>                  
               
                </td> 

              <td>
                    <Button className="btn btn-danger" onClick={(e) => this.handleDelete1(e)}><span class="glyphicon glyphicon-trash"></span> Delete </Button>  
                    <div>
                        <Modal show={this.state.showd} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Store</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div> Are you sure?</div>
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
            return (

                <Fragment>
                    <div className='divpad'>  <Button className="btn btn-primary" onClick={(e) => this.handleCreate1(e)}> Create New Store</Button>
                       
                        <div>
                            <Modal show={this.state.showc} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create Store</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <div>
                                        <form id="myform" onSubmit={this.handleCreate}>
                                            <br />

                                            < div className="form-group row" >
                                                <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                                                <div className="col-md-4">
                                                    <input className="form-control" type="text" name="name" autoComplete="off" value={this.state.name} onChange={this.Change} />
                                                    <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                                </div>
                                            </div >

                                            < div className="form-group row" >
                                                <label className=" control-label col-md-12" htmlFor="Address">Address</label>
                                                <div className="col-md-4">
                                                    <input className="form-control" type="text" name="address" autoComplete="off" value={this.state.address} onChange={this.Change} />
                                                    <span style={{ color: "red" }}>{this.state.errors["address"]}</span>
                                                </div>
                                            </div >

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
                        </div>
                    </div>
                    <div>
                        <table className="table table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
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
export default withRouter(FetchStore1);


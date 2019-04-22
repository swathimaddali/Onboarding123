
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import $ from 'jquery';
import { Button, Modal } from 'react-bootstrap';


class AddSales extends React.Component {


    constructor(props) {
        super(props);
        this.state = {

            loading: true,
            proddata: [],
            productname: '',
            dateSold: '',
            customername: '',
            storename: '',
            show: true,




        };


        var salesid = this.props.match.params["id"];
        console.log("this.props.match.params id" + salesid);

        // GET https://localhost:44394/Sales/Details/2 
        $.getJSON('Sales/Details/' + salesid, function (data) {

            console.log("Add Sales" + JSON.stringify(data));

            //Add Sales
            // {
            // "custNames": ["nagma", "fint", "Swati edited"], 
            //"storeNames": ["samsung_westfield", "samsung_Burwood"],
            //"prodNames": ["Mobile", "Talet", "ear"],
            //"id": 3, "dateSold": "2018-12-10T00:00:00", "productname": "Talet", "customername": "nagma", "storename": "samsung_Burwood"


            this.setState({ loading: false, proddata: data, productname: data.productname, dateSold: data.dateSold, storename: data.storename, customername: data.customername});
        
    console.log("Add Salessalesdata" + JSON.stringify(this.state.proddata));
        }.bind(this));

        this.handleSave = this.handleSave.bind(this);
        this.Change = this.Change.bind(this);
        this.handleClose = this.handleClose.bind(this);



    }
    handleClose() {

        this.setState({ show: false });
        this.props.history.push("/fetchSales");
    }


    Change(event) {

        console.log("inside change event.target.name::" + event.target.name + "event.target.value::" + event.target.value);
       //
        this.setState({[event.target.name]:event.target.value});

       // this.setState({ productname: event.target.value }, function () { console.log("is it changed noww" + this.state.productname); });
        
    }

         handleSave(event) {
           
        event.preventDefault();
             console.log("inside save");

             if (this.state.proddata.id) {


                 var formData = {
                     Id: this.state.proddata.id,
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



                 fetch('Sales/Edit/' + this.state.proddata.id, {
                     method: 'PUT',
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
    }





        /*

    // This will handle the submit form event.  
    handleSave(event) {
        event.preventDefault();

        // PUT request for Edit employee.  



        if (this.state.salesdata.id) {
            console.log("submitting");


            var formData = {
                id: this.state.salesdata.id,
                Productname: this.state.salesdata.productname,
                Customername: this.state.salesdata.customername,
                Storename: this.state.salesdata.storename,
                DateSold: this.state.salesdata.dateSold
            }

        }

        var formBody = [];
        for (var property in formData) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(formData[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('Sales/Edit/' + this.state.salesdata.id, {
            method: 'PUT',
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

*/
    
    // This will handle Cancel button click event.  
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchSales");
    }


    // Returns the HTML Form to the render() method.  
    renderCreateForm() {
       // console.log("inside addsales:::sales data is " + JSON.stringify(this.state.salesdata));

        var custnames = (this.state.proddata.custNames);
        var prodnames = (this.state.proddata.prodNames);
        var storenames = (this.state.proddata.storeNames);

        var i = 1;
        //["Mobile","Talet","ear"]
       var  MakeItem = function (X) {
           return <option key={i++} value={X}>{X}</option>;

        }

        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
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
                                        <input className="form-control" type="text" name="dateSold" onChange={this.Change} defaultValue={this.state.dateSold} required />
                                    </div>
                                </div >
                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Customer">Customer</label>
                                    <div className="col-md-4">

                                        <select name="customername" onChange={this.Change} value={this.state.customername}> => {custnames.map(MakeItem)}</select>
                                    </div>
                                </div>

                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Product">Product</label>
                                    <div className="col-md-4">

                                        <select name="productname" onChange={this.Change} value={this.state.productname}> => {prodnames.map(MakeItem)}</select>
                                    </div>
                                </div>





                                < div className="form-group row" >
                                    <label className=" control-label col-md-12" htmlFor="Store">Store</label>
                                    <div className="col-md-4">

                                        <select name="storename" onChange={this.Change} value={this.state.storename}> => {storenames.map(MakeItem)}</select>
                                    </div>
                                </div>



                                



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

        return (
            <div>  {contents}  </div>
        );
    }

}
export default AddSales;



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
        }


        $.getJSON('Sales/Create/', function (data) {

            console.log("Add Sales" + JSON.stringify(data));

            //Add Sales
            // {
            // "custNames": ["nagma", "fint", "Swati edited"], 
            //"storeNames": ["samsung_westfield", "samsung_Burwood"],
            //"prodNames": ["Mobile", "Talet", "ear"],
            //"id": 3, "dateSold": "2018-12-10T00:00:00", "productname": "Talet", "customername": "nagma", "storename": "samsung_Burwood"


            this.setState({loading:false, proddata: data },  ()=> {
                console.log("Add Salessalesdata" + JSON.stringify(this.state.proddata));

            });

          }.bind(this));




        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
  
     
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

    

    handleSave(event) {

        event.preventDefault();
            console.log("inside save");
            this.setState({ loading: true });

        if (this.state.customername == '' || this.state.productname == '' || this.state.storename=='') {
            alert("select all fields");
            this.setState({ loading: false });
            return;
        }


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
                                            <input className="form-control" type="text" name="dateSold" onChange={this.handleChange} required />
                                        </div>
                                    </div >
                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Customer">Customer</label>
                                        <div className="col-md-4">

                                            <select name="customername" onChange={this.handleChange} ><option value="">select </option> => {custnames.map(MakeItem)}</select>
                                        </div>
                                    </div>

                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Product">Product</label>
                                        <div className="col-md-4">

                                            <select name="productname" onChange={this.handleChange} ><option value="">select </option>=> {prodnames.map(MakeItem)}</select>
                                        </div>
                                    </div>
                                    < div className="form-group row" >
                                        <label className=" control-label col-md-12" htmlFor="Store">Store</label>
                                        <div className="col-md-4">

                                            <select name="storename" onChange={this.handleChange} ><option value="">select </option> => {storenames.map(MakeItem)}</select>
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
import React from "react";
import SalesGridRow from "./SalesGridRow";
import $ from 'jquery';



class SalesGridTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = { items: [] };
    }

    componentDidMount() {
      
        $.getJSON(this.props.dataUrl, function (data) {

            this.setState({ items: data });

        }.bind(this));
        console.log(this.state.items);
    }


    render() {
        console.log("inside render :data s this.state.items" + JSON.stringify(this.state.items[0]) + "and " + this.state.items.length);
        var rows = [];
        if (this.state.items.length == 0) {
            //alert("length is 0");

        }
        else {
            var len = this.state.items.length;
            for (var i = 0; i < len; i++) {
               console.log("id is " + this.state.items[i].id + JSON.stringify(this.state.items[i]));
              //  "id": 3, "dateSold": "2018-12-10T00:00:00", "productname": "Talet", "customername": "nagma", "storename": "samsung_Burwood"
                rows.push(
                    <SalesGridRow key={this.state.items[i].id} item={this.state.items[i]} data={this.items}/>)
            }

            console.log(rows);
        }




        return (
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
                        {rows}
                    </tbody>
                </table>
                
                </div>
            );
    }
}

export default SalesGridTable;





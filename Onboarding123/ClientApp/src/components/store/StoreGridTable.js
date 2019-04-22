import React from "react";
import StoreGridRow from "./StoreGridRow";
import $ from 'jquery';



class StoreGridTable extends React.Component {

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
                rows.push(
                    <StoreGridRow key={this.state.items[i].id} item={this.state.items[i]} data={this.items} />)
            }

            console.log(rows);
        }




        return (
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
                        {rows}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default StoreGridTable;





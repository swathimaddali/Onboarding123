
import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';


class FormComponent extends React.Component {
    constructor(props) {
        super(props);


        this.state={
            submitButtonToggle: true,
            name: '',
            address: '',
        }

        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = (event) => {
        console.log("inside handleSave" + this.state.name);
    }

    inputHandler=(e)=>{
        if(e){
            this.setState({
                username: e.target.value
            })
        }
    }

    render(){
        return(
            <div>
                <form id="myform1" onSubmit={this.handleSave}>
                    <br />
                    Name: <input
                        type="text"
                        value={this.state.name}
                        onChange={this.inputHandler}
                    /> <br />
                    Address: <input
                        type="text"
                        value={this.state.address}
                        onChange={this.inputHandler}
                    /><br /><br />

                    <button type="submit" >Save</button>
                </form>      
            </div>
        )
    }
}
export default FormComponent;
import FormComponent from './FormComponent';
import * as React from 'react';

class ModalComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalToggle: props.show
        }
    }
    render() {
        if (this.state.modalToggle) {
            return (
                <div>
                    <div className='ModalContainer'>
                        <FormComponent />
                    </div>
                </div>
            )
        } else {
            return (<div></div >);
        }
    }
}

export default ModalComponent;
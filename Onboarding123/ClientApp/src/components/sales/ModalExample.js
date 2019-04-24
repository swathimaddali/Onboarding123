<td>
    <Button className="btn btn-warning" onClick={(e) => this.handleEdit(e, d)}> <span class="glyphicon glyphicon-pencil"></span> Edit</Button>

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
                <Button className="btn btn-success" variant="primary" onClick={this.handleSave}>
                    Edit <span class="glyphicon glyphicon-ok"></span>
                </Button>
            </Modal.Footer>
        </Modal>
    </div >
</td>



    <td>
        <Button className="btn btn-danger" onClick={(e) => this.handleDelete1(e)}><span class="glyphicon glyphicon-trash"></span> Delete </Button>

        <div>
            <Modal show={this.state.showd} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>                            <div> Are you sure?</div>

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


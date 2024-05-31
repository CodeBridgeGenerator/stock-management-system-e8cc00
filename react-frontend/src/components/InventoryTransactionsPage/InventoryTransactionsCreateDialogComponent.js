import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';

import { Dropdown } from 'primereact/dropdown';



const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const InventoryTransactionsCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [lens, setLens] = useState([])

    useEffect(() => {
        // replace this when there is a date field
        // const init  = { todate : new Date(), from : new Date()};
        // set_entity({...init});
        set_entity({});
    }, [props.show]);

    const validate = () => {
        {/*~cb-data-to-validate~*/}
        return true;
    }

    const onSave = async () => {
        let _data = {
            transactionDate: _entity?.transactionDate,
quantityChange: _entity?.quantityChange,
transactionType: _entity?.transactionType,
lens: _entity?.lens?._id,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("inventoryTransactions").create(_data);
        const eagerResult = await client
            .service("inventoryTransactions")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "lens",
                    service : "lens",
                    select:["lensname"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info inventoryTransactions updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create" });
        }
        setLoading(false);
    };

    useEffect(() => {
                    // on mount lens
                    client
                        .service("lens")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setLens(res.data.map((e) => { return { name: e['lensname'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Lens", type: "error", message: error.message || "Failed get lens" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError("");
    };

    const lensOptions = lens.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create InventoryTransaction" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="inventoryTransactions-create-dialog-component">
            <div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="transactionDate">Transaction Date:</label>
                <InputText id="transactionDate" className="w-full mb-3 p-inputtext-sm" value={_entity?.transactionDate} onChange={(e) => setValByKey("transactionDate", e.target.value)}  />
            </span>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="quantityChange">Quantity Change:</label>
                <InputText id="quantityChange" className="w-full mb-3 p-inputtext-sm" value={_entity?.quantityChange} onChange={(e) => setValByKey("quantityChange", e.target.value)}  />
            </span>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="transactionType">Transaction Type:</label>
                <InputText id="transactionType" className="w-full mb-3 p-inputtext-sm" value={_entity?.transactionType} onChange={(e) => setValByKey("transactionType", e.target.value)}  />
            </span>
            </div>
<div className="col-12 md:col-6 field mt-5">
            <span className="align-items-center">
                <label htmlFor="lens">Lens:</label>
                <Dropdown id="lens" value={_entity?.lens?._id} optionLabel="name" optionValue="value" options={lensOptions} onChange={(e) => setValByKey("lens", {_id : e.value})}  />
            </span>
            </div>
                <small className="p-error">
                    {Array.isArray(error)
                        ? error.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : error}
                </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(InventoryTransactionsCreateDialogComponent);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import moment from "moment";
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

const LensCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [brandid, setBrandid] = useState([])
const [categoryid, setCategoryid] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount brands
                    client
                        .service("brands")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setBrandid(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Brands", type: "error", message: error.message || "Failed get brands" });
                        });
                }, []);
 useEffect(() => {
                    //on mount categories
                    client
                        .service("categories")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 } } })
                        .then((res) => {
                            setCategoryid(res.data.map((e) => { return { name: e['categoryname'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Categories", type: "error", message: error.message || "Failed get categories" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            lensname: _entity?.lensname,
price: _entity?.price,
availablestockquantity: _entity?.availablestockquantity,
brandid: _entity?.brandid?._id,
categoryid: _entity?.categoryid?._id,
        };

        setLoading(true);
        try {
            
        await client.service("lens").patch(_entity._id, _data);
        const eagerResult = await client
            .service("lens")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "brandid",
                    service : "brands",
                    select:["name"]},{
                    path : "categoryid",
                    service : "categories",
                    select:["categoryname"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info lens updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

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
    // children dropdown options

    const brandidOptions = brandid.map((elem) => ({ name: elem.name, value: elem.value }));
const categoryidOptions = categoryid.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit undefined" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="lens-edit-dialog-component">
                <div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="lensname">Lens Name:</label>
            <InputText id="lensname" className="w-full mb-3 p-inputtext-sm" value={_entity?.lensname} onChange={(e) => setValByKey("lensname", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="price">Price:</label>
            <InputText id="price" className="w-full mb-3 p-inputtext-sm" value={_entity?.price} onChange={(e) => setValByKey("price", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="availablestockquantity">Available Stock Quantity:</label>
            <InputText id="availablestockquantity" className="w-full mb-3 p-inputtext-sm" value={_entity?.availablestockquantity} onChange={(e) => setValByKey("availablestockquantity", e.target.value)}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="brandid">Brand ID:</label>
            <Dropdown id="brandid" value={_entity?.brandid?._id} optionLabel="name" optionValue="value" options={brandidOptions} onChange={(e) => setValByKey("brandid", {_id : e.value})}  />
        </span>
        </div>
<div className="col-12 md:col-6 field mt-5">
        <span className="align-items-center">
            <label htmlFor="categoryid">Category ID:</label>
            <Dropdown id="categoryid" value={_entity?.categoryid?._id} optionLabel="name" optionValue="value" options={categoryidOptions} onChange={(e) => setValByKey("categoryid", {_id : e.value})}  />
        </span>
        </div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdAt:{" " + moment(_entity?.createdAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedAt:{" " + moment(_entity?.updatedAt).fromNow()}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">createdBy:{" " +_entity?.createdBy?.name}</p></div>
                <div className="col-12 md:col-6 field mt-5"><p className="m-0">lastUpdatedBy:{" " +_entity?.updatedBy?.name}</p></div>
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

export default connect(mapState, mapDispatch)(LensCreateDialogComponent);

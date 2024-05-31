import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../../services/restClient";
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import UserLayout from "../Layouts/UserLayout";

import InventoryTransactionsPage from "../InventoryTransactionsPage/InventoryTransactionsPage";

const SingleLensPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();

    const [brandid, setBrandid] = useState([]);
const [categoryid, setCategoryid] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("lens")
            .get(urlParams.singleLensId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"brandid","categoryid"] }})
            .then((res) => {
                set_entity(res || {});
                const brandid = Array.isArray(res.brandid)
            ? res.brandid.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.brandid
                ? [{ _id: res.brandid._id, name: res.brandid.name }]
                : [];
        setBrandid(brandid);
const categoryid = Array.isArray(res.categoryid)
            ? res.categoryid.map((elem) => ({ _id: elem._id, categoryname: elem.categoryname }))
            : res.categoryid
                ? [{ _id: res.categoryid._id, categoryname: res.categoryid.categoryname }]
                : [];
        setCategoryid(categoryid);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Lens", type: "error", message: error.message || "Failed get lens" });
            });
    }, [props,urlParams.singleLensId]);


    const goBack = () => {
        navigate(-1, { replace: true });
    };

    return (
        <UserLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-10">
                <div className="flex align-items-center justify-content-start">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Lens</h3>
                </div>
                <p>lens/{urlParams.singleLensId}</p>
                {/* ~cb-project-dashboard~ */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Lens Name</label><p className="m-0 ml-3" >{_entity?.lensname}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Price</label><p className="m-0 ml-3" >{_entity?.price}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-primary">Available Stock Quantity</label><p className="m-0 ml-3" >{_entity?.availablestockquantity}</p></div>
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Brand ID</label>
            <p>{brandid.map((elem) => (
                    <Link key={elem._id} to={`/brands/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.name}</p>
                        </div>
                    </Link>
                ))}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm">Category ID</label>
            <p>{categoryid.map((elem) => (
                    <Link key={elem._id} to={`/categories/${elem._id}`}>
                        <div className="card">
                            <p className="text-xl text-primary">{elem.categoryname}</p>
                        </div>
                    </Link>
                ))}</p></div>

            <div className="col-12">&nbsp;</div>
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">created</label>
                <p className="m-0 ml-3">{moment(_entity?.createdAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">updated</label>
                <p className="m-0 ml-3">{moment(_entity?.updatedAt).fromNow()}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">createdBy</label>
                <p className="m-0 ml-3">{_entity?.createdBy?.name}</p>
            </div>
            
            <div className="col-12 md:col-6 lg:col-3">
                <label className="text-sm text-primary">lastUpdatedBy</label>
                <p className="m-0 ml-3">{_entity?.updatedBy?.name}</p>
            </div>

                </div>
            </div>
        </div>
        <InventoryTransactionsPage/>
        </UserLayout>
    );
};

const mapState = (state) => {
    return {};
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
    //
});

export default connect(mapState, mapDispatch)(SingleLensPage);

import React from "react";
import { Helmet } from "react-helmet";

const BreadCrumb = (props) =>{
    return (
        <>
                <Helmet>
                    <title>{props.title} | Fashion Club BD</title>
                </Helmet>
                <ol className="breadcrumb my-4">
                    <li className="breadcrumb-item text-theme-light">Dashboard</li>
                    <li className="breadcrumb-item active">{props.title}</li>
                </ol>
        </>

    );
};


export default BreadCrumb;
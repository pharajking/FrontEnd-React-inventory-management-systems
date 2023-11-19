import React from "react";

const Footer = () =>{
    return (
        <footer className="py-1 bg-theme mt-auto">
        <div className="container-fluid px-4">
            <div className="d-flex align-items-center justify-content-between small">
                <small className="text-silver">Copyright &copy; Fashion Club BD {new Date().getFullYear()} | Version: 0.1.0 Beta</small>
                <div>
                    <small className="text-silver">Design & Develop By <a className={'text-white'} href="#">Pharaj</a></small>
                    
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
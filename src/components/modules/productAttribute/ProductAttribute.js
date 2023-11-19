import React from 'react'
import BreadCrumb from '../../partials/BreadCrumb'
import CardHeader from '../../partials/miniComponent/CardHeader'
import { Link } from 'react-router-dom'

const ProductAttribute = () => {
  return (
    <>
      <BreadCrumb title={'Product Attributes'}/>
    <div class="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className={'text-theme'}>Product Attributes</h4>
             <button className={'btn theme-button'}>
                <i className={`fa-solid fa-plus`}></i>Add</button>
                    
         </div> 
          </div>
          <div className="card-body">
            {/* name, slug, description, serial, photo, Status*/}
            <div className="row">
           </div>
           </div>
           </div> 
           </div>
           </div>
    </>
  )
}

export default ProductAttribute

import React from 'react'
import { useState } from 'react'
import Constants from '../../../Constants'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import BreadCrumb from '../../partials/BreadCrumb'
import CardHeader from '../../partials/miniComponent/CardHeader'
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal'
import CategoryDetailsModal from '../../partials/modals/CategoryDetailsModal'
import Pagination from 'react-js-pagination'
import NoDataFound from '../../partials/miniComponent/NoDataFound'
import { Link } from 'react-router-dom'
import Loader from '../../partials/miniComponent/Loader'

const SubCategoryList = () => {
    const [input, setInput] =  useState({
        order_by : 'serial',
        per_page : 10,
        direction : 'asc',
        search : ''
      })
      const [isLoading, setIsLoading] = useState(false)
      const [category, setCategory] = useState([])
      const [itemsCountPerPage, setItemsCountPerPage] = useState(0)
      const [totalItemsCount, setTotalItemsCount] = useState(1)
      const [startFrom, setStartFrom] = useState(1)
      const [activePage, setActivePage] = useState(1)
  
      const[categories, setCategories] = useState([])
      const [modalPhoto, setModalPhoto] = useState('')
      const [modalShow, setModalShow] = React.useState(false)
      const [modalPhotoShow, setModalPhotoShow] = React.useState(false)
  
      const getCategories = (pageNumber=1) => {
        // console.log(pageNumber)
        setIsLoading(true)
        axios.get(`${Constants.BASE_URL}/sub-category?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`).then(res=> {
          setCategories(res.data.data)
          setItemsCountPerPage(res.data.meta.per_page)
          setStartFrom(res.data.meta.from)
          setTotalItemsCount(res.data.meta.total)
          setActivePage(res.data.meta.current_page)
          setIsLoading(false)
        })
      }
  
      const handlePhotoModal = (photo)=> {
        setModalPhoto(photo)
        setModalPhotoShow(true)
      
      }
  
      const handleDetailsModal = (category)=> {
        setCategory(category)
        setModalShow(true)
      }
  
      const handleCategoryDelete = (id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Category will be deleted",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`${Constants.BASE_URL}/sub-category/${id}`).then(res=> {
              getCategories()
              Swal.fire({
                position: 'top-end',
                icon: res.data.cls,
                title: res.data.msg,
                showConfirmButton: false,
                toast: true,
                timer: 1500
              })
  
            })
           
          }
        })
       
      }
  
      const handleInput = (e)=>{
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
      }
  
  
  
      useEffect(()=> {
          getCategories()
      }, [])
    
  return (
    <>
        <BreadCrumb title={'Sub Category List'}/>
        <div class="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">
                <CardHeader
                  title = {'Sub Category list'}
                  link = {'/sub-category/create'}
                  icon = {'fa-add'}
                  button_text = {'Add'}
                />
              </div>
              <div className="card-body">
                <div className="search-area mb-4">
                  <div className="row">
                    <div className="col-md-3">
                      <label className={'w-100'}>
                        <p>Search</p>
                          <input
                            className='form-control form-control-sm'
                            type={'search'}
                            name={'search'}
                            value={input.search}
                            onChange={handleInput}
                            placeholder={'Search...'}
                          />
                      </label>
                    </div>


                    <div className="col-md-3">
                      <label className={'w-100'}>
                        <p>Order By</p>
                          <select
                            className='form-select form-select-sm'
                            name={'order_by'}
                            value={input.order_by}
                            onChange={handleInput}
                           >
                            <option value={'name'}>Name</option>
                            <option value={'created_at'}>Created at</option>
                            <option value={'updated_at'}>Updated at</option>
                            <option value={'serial'}>Serial</option>
                            <option value={'status'}>Status</option>
                           </select>
                      </label>
                    </div>
                    <div className="col-md-2">
                      <label className={'w-100'}>
                        <p>Order Direction</p>
                          <select
                            className='form-select form-select-sm'
                            name={'direction'}
                            value={input.direction}
                            onChange={handleInput}
                           >
                           
                            <option value={'asc'}>ASC</option>
                            <option value={'desc'}>DESC</option>
                           
                           </select>
                      </label>
                    </div> 
                    <div className="col-md-2">
                      <label className={'w-100'}>
                        <p>Per Page</p>
                          <select
                            className='form-select form-select-sm'
                            name={'per_page'}
                            value={input.per_page}
                            onChange={handleInput}
                           >
                           
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                           
                           </select>
                      </label>
                    </div> 

                    <div className="col-md-2">
                    <div className="d-grid mt-4">
                       <button className={'btn btn-sm theme-button'} onClick={()=> getCategories(1)}>
                       <i class="fa-solid fa-magnifying-glass"></i>Search</button>
                      </div>
                    
                    </div>
                  </div>
                </div>

                {isLoading ? <Loader/> :
                   <div className="table-responsive soft-landing">
                   <table className={'my-table table table-hover table-striped table-bordered'}>
                     <thead>
                       <tr>
                         <th>SL</th>
                         <th>Name / Slug / Category</th>
                         <th>Serial / Status</th>
                         <th>Photo</th>
                         <th>Created By </th>
                         <th>Date Time</th>
                         <th>Action</th>
                       </tr>
                     </thead>
                     <tbody>
                       {Object.keys(categories).length > 0 ? categories.map((category, index)=> (
                           <tr key={index}>
                           <td>{startFrom + index}</td>
                           <td>
                             <p className={'text-theme'}>Name: {category.name}</p>
                             <p className={'text-success'}>Slug: {category.slug}</p>
                             <p className={'text-theme'}>Category: {category.category_name}</p>
                           </td>
                           <td>
                             <p className={'text-theme'}>Serial : {category.serial}</p>
                             <p className={'text-success'}>Status: {category.status}</p>
                           </td>
                           <td>
                             <img onClick={()=>handlePhotoModal(category.photo_full)} src={category.photo} alt={category.name} className={'img-thumbnail table-image'}/>
                             
                           </td>
                           <td>
                             {category.created_by}
                            
                           </td>
                           <td>
                             <p className={'text-theme'}><small>Created: {category.created_at}</small></p>
                             <p className={'text-success'}><small>Updated: {category.updated_at}</small></p>
                           </td>
                           <td>
                             <button onClick={()=>handleDetailsModal(category)} className={'btn btn-sm btn-info my-1'}><i className="fa-solid fa-eye"></i></button>
                             <Link to={`/sub-category/edit/${category.id}`}><button className={'btn btn-sm btn-warning my-1 mx-1'}><i className="fa-solid fa-edit"></i></button></Link>
                             <button onClick={()=>handleCategoryDelete(category.id)} className={'btn btn-sm btn-danger my-1'}><i className="fa-solid fa-trash"></i></button>
                           </td>
                         </tr>
                       )): <NoDataFound/> }
                     
 
                     </tbody>
 
                   </table>
                   <CategoryPhotoModal
                   show={modalPhotoShow}
                   onHide={() => setModalPhotoShow(false)}
                   title = {'Sub Category Photo'}
                   size = {''}
                   photo={modalPhoto}
                 />
                 <CategoryDetailsModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title = {'Sub Category Details'}
                    size = {''}
                    category={category}
 
                 />
               
                 </div>
                }
               
              </div>

              <div className="card-footer">
                <nav className={'pagination-sm'}>
                    <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={getCategories}
                    nextPageText={'Next'}
                    firstPageText={'First'}
                    prevPageText={'Previous'}
                    lastPageText={'last'}
                    itemClass={'page-item'}
                    linkClass={'page-link'}
                  />
                </nav>
             
              </div>

            </div>
          </div>
        </div>
    </>
  )
}

export default SubCategoryList

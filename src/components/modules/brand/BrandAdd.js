import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../../partials/BreadCrumb';
import CardHeader from '../../partials/miniComponent/CardHeader';
import axios from 'axios';
import Constants from '../../../Constants';
import Swal from 'sweetalert2';

const BrandAdd = () => {
    const navigate = useNavigate();
    const [input, setInput] =  useState({status: 1})
    const [errors, setErrors] =  useState([])
    const [isLoading, setIsLoading] = useState(false)
  
    const handleInput = (e)=>{
        if(e.target.name == 'name'){
           let slug = e.target.value
           slug = slug.toLowerCase()
           slug = slug.replaceAll(' ', '-')
           setInput(prevState => ({...prevState, slug: slug}))
        }
        setInput(prevState => ({...prevState, [e.target.name] : e.target.value}))
  
    }
     
    const handlePhoto = (e)=> {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onloadend = ()=> {
         setInput(prevState => ({...prevState, logo: reader.result}))
      }
      reader.readAsDataURL(file)
  
    }
  
    const handleBrandCreate = ()=>{
      setIsLoading(true)
      axios.post(`${Constants.BASE_URL}/brand`, input).then(res=> {
        setIsLoading(false)
        Swal.fire({
          position: 'top-end',
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500
        })
        navigate('/brand')
      }).catch(errors => {
        setIsLoading(false)
        if(errors.response.status == 422){
            setErrors(errors.response.data.errors)
        }
    })
      
      
    }
  
  return (
    <>
        
    <BreadCrumb title={'Add Brand'}/>
    <div class="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <CardHeader
                title = {'Add Brand'}
                link = {'/brand'}
                icon = {'fa-list'}
                button_text = {'List'}
            
            />
          </div>
          <div className="card-body">
            {/* name, slug, description, serial, photo, Status*/}
            <div className="row">
              <div className="col-md-6">
                <label className={'w-100 mt-4'}>
                  <p>Name</p>
                  <input
                      className={errors.name != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                      type={'text'}
                      name={'name'}
                      value={input.name}
                      onChange={handleInput}
                      placeholder={'Enter brand Name'}
                  />
                   <p className={'login-error-msg'}><small>{errors.name != undefined ? errors.name[0] : null}</small></p>
                </label>
              </div>
              <div className="col-md-6">
              <label className={'w-100 mt-4'}>
                  <p>Slug</p>
                  <input
                      className={errors.slug != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                      type={'text'}
                      name={'slug'}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder={'Enter brand Slug'}
                  />
                   <p className={'login-error-msg'}><small>{errors.slug != undefined ? errors.slug[0] : null}</small></p>
                </label>
              </div>

              <div className="col-md-6">
              <label className={'w-100 mt-4'}>
                  <p>Serial</p>
                  <input
                      className={errors.serial != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                      type={'number'}
                      name={'serial'}
                      value={input.serial}
                      onChange={handleInput}
                      placeholder={'Enter brand Serial'}
                  />
                   <p className={'login-error-msg'}><small>{errors.serial != undefined ? errors.serial[0] : null}</small></p>
                </label>
              </div>
              <div className="col-md-6">
              <label className={'w-100 mt-4'}>
                  <p>Status</p>
                 
                  <select
                     className={errors.status != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                     name={'status'}
                     value={input.status}
                     onChange={handleInput}
                     placeholder={'Enter brand Status'}
                  >
                      {/* <option disabled={true}>Select Category Status</option> */}
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                  </select>
                   <p className={'login-error-msg'}><small>{errors.status != undefined ? errors.status[0] : null}</small></p>
                </label>
              </div>

              <div className="col-md-6">
              <label className={'w-100 mt-4'}>
                  <p>Description</p>
                  <textarea
                      className={errors.description != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                      name={'description'}
                      value={input.description}
                      onChange={handleInput}
                      placeholder={'Enter brand Description'}
                  />
                   <p className={'login-error-msg'}><small>{errors.description != undefined ? errors.description[0] : null}</small></p>
                </label>
              </div>
              <div className="col-md-6">
              <label className={'w-100 mt-4'}>
                  <p>Logo</p>
                  <input
                      className={errors.logo != undefined ? 'form-control mt-2 is-invalid': 'form-control mt-2'}
                      type={'file'}
                      name={'logo'}
                      onChange={handlePhoto}
                      
                  />
                   <p className={'login-error-msg'}><small>{errors.logo != undefined ? errors.logo[0] : null}</small></p>
                </label>
                {input.logo != undefined ?
                   <div className="row">
                   <div className="col-6">
                   <div className="photo-preview mt-3">
                   <img alt={'Photo preview'} src={input.logo} className={'img-thumbnail aspect-one'} />
                 </div>
                   </div>
                 </div> : null
                  
              }
               
               
              </div>

              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                  <div className="d-grid mt-4">
                   <button className={'btn theme-button'} onClick={handleBrandCreate} dangerouslySetInnerHTML={{__html: isLoading ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...': 'Add Brand'}}/>
                  </div>
                

                  </div>
                </div>
                 
              </div>
            </div>

          </div>
        </div>
      </div>
        
    </div>
  
</>
  )
}

export default BrandAdd

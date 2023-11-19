import React from 'react'
import { Link } from 'react-router-dom'

const CardHeader = (props) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
            <h4 className={'text-theme'}>{props.title}</h4>
            <Link to={props.link}> <button className={'btn theme-button'}>
                <i className={`fa-solid ${props.icon}`}></i> {props.button_text}</button></Link>
                    
    </div> 
  )
}

export default CardHeader

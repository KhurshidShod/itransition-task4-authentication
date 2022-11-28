import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BackButton() {
  return (
    <div>
        <Button
        className='float-end text-align-center d-flex justify-content-center m-3 border-primary text-primary bg-transparent back_btn'>
            <Link style={{textDecoration: 'none'}} to="/">Back</Link>
        </Button>
    </div>
  )
}

export default BackButton
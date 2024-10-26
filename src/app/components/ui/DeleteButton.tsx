"use client"
import React from 'react'

interface params {
    formAction: ((formData: FormData) => void | Promise<void>)

}
const DeleteButton: React.FC<params> = ({ formAction }) => {
    return (
        <button formAction={formAction} >
            <i className='material-icons opacity-50'>delete</i>
        </button >
    )
}

export default DeleteButton
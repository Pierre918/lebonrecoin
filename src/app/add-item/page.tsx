import React from 'react'
import SubHeader from '../components/ui/SubHeader'
import ItemForm from '../components/ui/ItemForm';

const page = () => {

    return (
        <>

            <SubHeader title="Sell new item" show_filter={false}></SubHeader>
            <ItemForm></ItemForm>
        </>
    )
}

export default page
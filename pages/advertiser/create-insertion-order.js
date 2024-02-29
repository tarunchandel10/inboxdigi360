import React, { Component } from 'react';
import InsertionForm from '@/component/insertionform';
import withAuth from '@/component/withAuth';
function CreateInsertionOrder() {
    return ( 
        <>
        <InsertionForm/>
        </>
     );
}

export default withAuth(CreateInsertionOrder);
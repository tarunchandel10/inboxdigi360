import React, { Component } from 'react';
import InsertionForm from '@/component/insertionform';
import withAuth from '@/component/withAuth';
function CreateInsertionOrder() {
    return ( 
        <>
        <InsertionForm page="editInsertion"/>
        </>
     );
}

export default withAuth(CreateInsertionOrder);
import React, { Component } from 'react';
import LineItemForm from '@/component/lineitemform';
import { useRouter } from 'next/router';
import withAuth from '@/component/withAuth';

function InsertionLineItem() {
    const router = useRouter();
    const {campaign_id, campaign_insertion_id,lineItemId } = router.query;

    return ( 
        <>
        <LineItemForm page="editLineItem" campaign_id={campaign_id} campaign_insertion_id={campaign_insertion_id} lineItemId={lineItemId}/>
        </>
     );
}

export default withAuth(InsertionLineItem);
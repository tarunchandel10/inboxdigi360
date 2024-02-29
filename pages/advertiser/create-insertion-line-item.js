import React, { Component } from 'react';
import LineItemForm from '@/component/lineitemform';
import { useRouter } from 'next/router';
import withAuth from '@/component/withAuth';

function InsertionLineItem() {
    const router = useRouter();
    const {campaign_id, campaign_insertion_id } = router.query;

    return ( 
        <>
        <LineItemForm campaign_id={campaign_id} campaign_insertion_id={campaign_insertion_id} />
        </>
     );
}

export default  withAuth(InsertionLineItem);
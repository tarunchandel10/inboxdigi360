import React, { Component } from 'react';
import AdvertiserForm from '@/component/advertiserform';
import withAuth from '@/component/withAuth';

function CreateAdvertiser() {
    return ( 
        <>
        <AdvertiserForm/>
        </>
     );
}

export default withAuth(CreateAdvertiser);
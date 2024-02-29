import React, { Component } from 'react';
import AdvertiserForm from '@/component/advertiserform';
import withAuth from '@/component/withAuth';


function EditAdvertiser() {
    return ( 
        <>
        <AdvertiserForm page="editCampaign"/>
        </>
     );
}

export default withAuth(EditAdvertiser);
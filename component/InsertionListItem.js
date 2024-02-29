
import { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useRouter } from 'next/router';
import InsertionTable from './InsertionTable';
import Image from "next/image";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ListItemTable from './ListItemTable';
import { Baseurl } from './Baseurl';
import { getNewToken } from '@/pages/api/bulkUpload';
function InsertionListItem({data,campid,countsData,lineItemCount,dateChange,onCloneInsertion,onCloneLineItem}) {
    const [activeTab, setActiveTab] = useState('InsertionOrders');
    const [listItemData, setListItemData] = useState('');
    const [listItem, setListItem] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [insetionid, setInsertionId] = useState("")
  const router = useRouter();
  const { query } = router;

  

const fetchAllLineItemData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token ) {
      const resp = await fetch(`${Baseurl}campaign-order-line-item-list?campaign_id=${campid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (resp.ok) {
          const data = await resp.json();
          setListItem(data)
      } else {
          throw new Error('Failed to fetch data');
      }
     
    }
  } catch (error) {
    console.error('Error fetching campaign data:', error);
  }
};
    const changeTab = (tabName) => {
      // window.location.href = `/advertiser/all-insertion-orders?id=${campid}`;
        setActiveTab(tabName);
        if(tabName ==="LineItems"){
          fetchAllLineItemData()
        }
    };
    const handleViewLineItem = (item) => {
       setListItemData(item)
        setTimeout(() => {
          setActiveTab('LineItems');
        }, 2000);
        const url = `/advertiser/all-insertion-orders?id=${item.campaign_id}&campaign_insertion_id=${item.id}`;
        router.push(url, undefined, { shallow: true });
    };

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (token ) {
              const response = await fetch(`${Baseurl}campaign-insertion-line-item-list?campaign_id=${listItemData.campaign_id}&campaign_insertion_id=${listItemData.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });
          
              if (response.ok) {
                  const data = await response.json();
                  getNewToken(data)
                  setListItem(data)
              } else {
                  throw new Error('Failed to fetch data');
              }
             
            }
          } catch (error) {
            console.error('Error fetching campaign data:', error);
          }
        };
     
        if(query.campaign_insertion_id){

            fetchData();
        }
      }, [listItemData.id,activeTab]);
    
      useEffect(() => {
        const fetchFilterDate = async () => {
           try {
             const token = localStorage.getItem('token');
             if (token) {
               const response = await fetch(`${Baseurl}campaign-filter-line-item-list?campaign_id=${listItemData.campaign_id}&filter_date=${selectedDate}`, {
                 headers: {
                   Authorization: `Bearer ${token}`,
                   'Content-Type': 'application/json',
                 },
               });
               if (response.ok) {
                   const data = await response.json();
                   getNewToken(data)
                   setListItem(data)
               } else {
                 setListItem("")
                   throw new Error('Failed to fetch data');
               }
              
             }
           } catch (error) {
             setListItem("")
             console.error('Error fetching campaign data:', error);
           }
         };
       if(selectedDate){
         fetchFilterDate();
       }
       
       }, [selectedDate]);

      const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);
      };
    return (
          <>
          
          <section className="main">
            <div className="container-fluid">
                <div className="row">
                <div className="col-12">
                    <h3>Campaigns</h3>
                 </div>
                   <div className='col-12'>
                   <Tabs
                        activeKey={activeTab}
                        onSelect={(tabName) => changeTab(tabName)}
                        id="uncontrolled-tab-example"
                        className="mb-3 dashboard-titles"
                        >
                        <Tab eventKey="InsertionOrders" title="Insertion Orders" className="dashboard-tabs">
                            {countsData ?<div className='row'>
                                
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">Total impression delivered</h4>
                                        <span className="text-primary">{countsData.impression_total}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">clicks</h4>
                                        <span className="text-primary">{countsData.clicks_counts}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">average cpm</h4>
                                        <span className="text-primary">{countsData.average_cpm_total}</span>
                                    </div>
                                </div>
                                {/* <div className="col-12 pt-md-4 ">
                                    <h3 className='mb-0 position-relative'>No Data {['right'].map((placement) => (
                                                    <OverlayTrigger
                                                    key='right'
                                                    placement='right'
                                                    overlay={
                                                        <Tooltip className='bg-white p-3' id={`tooltip-right`}>
                                                        Displaying data for 0 entities
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <Image
                                                    className='ms-2'
                                                src="/images/Ask.svg"
                                                width={20}
                                                height={20}
                                                alt="Picture of the author"
                                            />
                                                    </OverlayTrigger>
                                                ))}
                                        </h3>
                                </div> */}
                            </div> :""}
                            <InsertionTable data={data.data} id={campid} changeTab={changeTab} handleViewLineItem={handleViewLineItem} dateChange={dateChange} onCloneInsertion={onCloneInsertion}/>
                        </Tab>
                        <Tab eventKey="LineItems" title="Line Items" className="dashboard-tabs">
                      {lineItemCount ?   <div className='row'>
                                
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">Total impression delivered</h4>
                                        <span className="text-primary">{lineItemCount.impressions_lost}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">clicks</h4>
                                        <span className="text-primary">{lineItemCount.total_cost}</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-xl-2 cus_pad">
                                    <div className="dash_detail">
                                        <h4 className="dash_heading">average cpm</h4>
                                        <span className="text-primary">{lineItemCount.average_performance}</span>
                                    </div>
                                </div>
                                {/* <div className="col-12 pt-md-4 ">
                                    <h3 className='mb-0 position-relative'>No Data {['right'].map((placement) => (
                                                    <OverlayTrigger
                                                    key='right'
                                                    placement='right'
                                                    overlay={
                                                        <Tooltip className='bg-white p-3' id={`tooltip-right`}>
                                                        Displaying data for 0 entities
                                                        </Tooltip>
                                                    }
                                                    >
                                                    <Image
                                                    className='ms-2'
                                                src="/images/Ask.svg"
                                                width={20}
                                                height={20}
                                                alt="Picture of the author"
                                            />
                                                    </OverlayTrigger>
                                                ))}
                                        </h3>
                                </div> */}
                            </div>:""}
                            <ListItemTable data={listItem} dateChange={handleDateChange}  campaign_id={campid} campaign_insertion_id={listItem?listItem.data.id:""} onCloneLineItem={onCloneLineItem}/>
                       
                        </Tab>
                    </Tabs>
                   </div>
                  
                </div>
            </div>
        </section>
              </>
   );
  }
  export default InsertionListItem;
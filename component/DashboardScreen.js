import DashboardTable from "./DashboardTable";

function DashboardScreen({campaignsData,data,onDateChange ,clearAllFilter,onCloneCampaign,onSearch,isFilterSelected,handleFilterChange }) {
  return (
        <>
        <section className="main">
            <div className="container-fluid">
                <div className="row">
                <div className="col-12">
                    <h3>Campaigns</h3>
                 </div>
                 <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail">
                                <h4 className="dash_heading"> All Campaigns</h4>
                                <span className="text-primary">{data ? data.all_campaign_counts : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail">
                                <h4 className="dash_heading">Approved</h4>
                                <span className="text-primary">{data ? data.approved_campaign_counts : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail">
                                <h4 className="dash_heading">Pending</h4>
                                <span className="text-primary">{data ? data.pending_campaign_counts : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail border-end">
                                <h4 className="dash_heading">Impressions</h4>
                                <span className="text-primary">{data ? data.impression_total : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail  border-end">
                                <h4 className="dash_heading">Clicks</h4>
                                <span className="text-success">{data ? data.clicks_counts : ""}</span>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-2 cus_pad">
                            <div className="dash_detail">
                                <h4 className="dash_heading">CTR</h4>
                                <span className="text-danger">{data ? data.ctr_total : ""}</span>
                            </div>
                        </div>
                </div>
            </div>
            <DashboardTable  data ={campaignsData} onDateChange={onDateChange} clearFilter={clearAllFilter}  onCloneCampaign={onCloneCampaign} onSearch={onSearch}   isFilterSelected={isFilterSelected} handleFilterChange={handleFilterChange}/>
        </section>
            </>
 );
}
export default DashboardScreen;
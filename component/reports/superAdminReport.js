import MultiCheckDropdown from "../dropdown/multiCheckDropdown";
import SingleCheckDropdown from "../dropdown/singleCheckDropdown";
import DatePickerDropdown from "../dropdown/datePickerDropdown";
import CustomButton from "../button/CustomButton";
import Image from "next/image";

export default function SuperAdminReport() {
    const adminItems = [
        { id: 'Admin1', name: 'Admin Name 1' },
        { id: 'Admin2', name: 'Admin Name 2' },
        { id: 'Admin3', name: 'Admin Name 3' },
        { id: 'Admin4', name: 'Admin Name 4' },
    ];

    const advertiserItems = [
        { id: 'Advertiser1', name: 'Advertiser Name 1' },
        { id: 'Advertiser2', name: 'Advertiser Name 2' },
        { id: 'Advertiser3', name: 'Advertiser Name 3' },
        { id: 'Advertiser4', name: 'Advertiser Name 4' },
    ];

    const campaignItems = [
        { id: 'Campaign1', name: 'Campaign Name 1' },
        { id: 'Campaign2', name: 'Campaign Name 2' },
        { id: 'Campaign3', name: 'Campaign Name 3' },
        { id: 'Campaign4', name: 'Campaign Name 4' },
    ];

    const inserationOrder = [
        { id: 'Insertion1', name: 'Insertion Order 1' },
        { id: 'Insertion2', name: 'Insertion Order 2' },
        { id: 'Insertion3', name: 'Insertion Order 3' },
        { id: 'Insertion4', name: 'Insertion Order 4' },
    ];

    const lineItems = [
        { id: 'Line1', name: 'Line Item 1' },
        { id: 'Line2', name: 'Line Item 2' },
        { id: 'Line3', name: 'Line Item 3' },
        { id: 'Line4', name: 'Line Item 4' },
    ];

    return (
        <>
            <section className="main">
                <div className="container-fluid mt-4 dashboard-container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="report-block">
                                <div className="dropdowns">
                                    <SingleCheckDropdown className="dropdown-inner" title="Admin Name" dropdownitem={adminItems} />
                                    <SingleCheckDropdown className="dropdown-inner" title="Advertiser Name" dropdownitem={advertiserItems} />
                                    <SingleCheckDropdown className="dropdown-inner" title="Campaign Name" dropdownitem={campaignItems} />
                                    <MultiCheckDropdown className="dropdown-inner" title="Insertion Order" dropdownitem={inserationOrder} />
                                    <MultiCheckDropdown className="dropdown-inner" title="Line Item" dropdownitem={lineItems} />
                                    <DatePickerDropdown className="dropdown-inner datepick" title="Date to" />
                                </div>
                                <div className="report-table">
                                    <table className="table table-borderless ">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Admin Name</th>
                                                <th>Advertiser Name</th>
                                                <th>Campagin Name</th>
                                                <th>Insertion Name</th>
                                                <th>Line Item Name</th>
                                                <th>CTR</th>
                                                <th>Impressions</th>
                                                <th>Clicks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>2023-11-09</td>
                                                <td></td>
                                                <td></td>
                                                <td>Fab India_Unified OTT_Oct23_Swamim_Kannada</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="report-download">
                                <CustomButton href='#' text="Download Report" iconSrc="/images/report-io.svg" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="report-block">
                                <div>
                                    <div>
                                        <span> Table Tree</span>   <Image
                                            src="/images/Vector.png"
                                            width={21}
                                            height={14}
                                            alt="vector"
                                            className="status-img"
                                            style={{ width: "21px", height: "14px" }}
                                        />  </div>
                                </div>
                                <div>
                                    <div>
                                        <span> Custom Data</span>   <Image
                                            src="/images/Vector.png"
                                            width={21}
                                            height={14}
                                            alt="vector"
                                            className="status-img"
                                            style={{ width: "21px", height: "14px" }}
                                        />  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

import { DoughnutChart } from "./charts/doughnutChart";
import { BarChart } from "./charts/barChart";
import AdminDashboardTable from "./table/AdminDashboardTable";
import SuperadminDashboardTable from "./table/SuperadminDashboardTable";
import CustomButton from "./button/CustomButton";
import Image from "next/image";
import { ADMIN, SUPER_ADMIN } from "@/common/constants";
import SelectField from "./Form/SelectField";
import { useState } from "react";

function AdminDashboard(props, onApply) {
  const { users, role, accountCount, budgetCount, chartCount, dataChangeFilter, handleSearchInputChange, handleStatusChange, callback } = props

  const onClear = () => {
    const el = document.querySelector(
      "div.status-filter-container .create-form-feild select",
    );
    console.log(el)
    document.getElementById('startDate').value = '';
    document.getElementsByClassName('search-header')[0].value = '';
    el.value ='';
    callback()


  }
  return (
    <>
      <section className="main">
        <div className="container-fluid mt-4 dashboard-container">
          <div className="row chart-data">
            <div className="col-md-4">
              <DoughnutChart accountCount={accountCount} />
            </div>
            <div className="col-md-4">
              <BarChart budgetCount={budgetCount} chartCount={chartCount} />
            </div>
          </div>
          <div className="row table-data">
            <div className="col-12">
              <div className="table_top">
                {role && role == SUPER_ADMIN && <CustomButton href='/superadmin/createAdminForm' text="Create Admin" iconSrc="/images/plus.svg" />}
                {role && role == ADMIN && <CustomButton href='/admin/createAdvertiserForm' text="Create Advertiser" iconSrc="/images/plus.svg" />}
                <div className="custom_date">
                  <input onChange={(e) => dataChangeFilter(e.target.value)} id="startDate" type="date" />
                </div>
                <div className="status-filter-container">
                  <SelectField  setValue={handleStatusChange}  name="filter"  options={['InActive','Active']} placholder={'Filter'} />
                </div>


                <div className="input-group search_box">
                  <span className="input-group-text">
                    <Image
                      src="/images/search.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                      style={{ width: "16px", height: "16px" }}
                    />
                  </span>
                  <input type="text" className="search-header" placeholder='Search '
                    onChange={handleSearchInputChange}
                  />
                </div>
                <div className="ms-auto clear" onClick={onClear}>Clear All</div>
              </div>
            </div>
            <div className="col-12 dashboard_table">
              <div className="table-responsive">
                {role && role == SUPER_ADMIN && <SuperadminDashboardTable users={users} />}
                {role && role == ADMIN && <AdminDashboardTable users={users} />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AdminDashboard;

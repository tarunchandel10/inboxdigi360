import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

export default function SuperAdminMenu({ activeLink }) {
  return (
    <>
      <MenuItem
        href="/superadmin/dashboard"
        src={activeLink === '/superadmin/dashboard' ? "/images/dashboard-active.svg" : "/images/dashboard.svg"}
        alt="Accounts"
        text="Accounts"
        activeLink={activeLink}
      />
      <MenuItem
        href="/superadmin/reports"
        src={activeLink === '/superadmin/reports' ? "/images/reports-active.svg" : "/images/Reports.svg"}
        alt="Reports"
        text="Reports"
        activeLink={activeLink}
      />
      <MenuItem
        href="/superadmin/panelusers"
        src={activeLink === '/superadmin/panelusers' ? "/images/paneluser-active.svg" : "/images/user_icon.svg"}
        alt="Panel User"
        text="Panel User"
        activeLink={activeLink}
      />
    </>
  );
}

import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

export default function AdminMenu({ activeLink }) {
  return (
    <>
      <MenuItem
        href="/admin/dashboard"
        src={activeLink === '/admin/dashboard' ? "/images/dashboard-active.svg" : "/images/dashboard.svg"}
        alt="Advertisers"
        text="Advertisers"
        activeLink={activeLink}
      />
      <MenuItem
        href="#"
        src={activeLink === '#' ? "/images/reports-active.svg" : "/images/Reports.svg"}
        alt="Reports"
        text="Reports"
        activeLink={activeLink}
      />
      <MenuItem
        href="/admin/panelusers"
        src={activeLink === '/admin/panelusers' ? "/images/paneluser-active.svg" : "/images/user_icon.svg"}
        alt="Panel User"
        text="Panel User"
        activeLink={activeLink}
      />
    </>
  );
}

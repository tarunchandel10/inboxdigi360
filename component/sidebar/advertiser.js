import React from 'react';
import MenuItem from "../MenuItem/MenuItem";

export default function AdvertiserMenu({ activeLink }) {
  return (
    <>
      <MenuItem
        href="/advertiser/dashboard"
        src={activeLink === '/advertiser/dashboard' ? "/images/campaign-active.svg" : "/images/Campaigns.svg"}
        alt="Campaigns"
        text="Campaigns"
        activeLink={activeLink}
      />
      <MenuItem
        href="/advertiser/creatives"
        src={activeLink === '/advertiser/creatives' ? "/images/creative-active.svg" : "/images/Creative.svg"}
        alt="Creative"
        text="Creative"
        activeLink={activeLink}
      />
      <MenuItem
        href="/advertiser/reports"
        src={activeLink === '/advertiser/reports' ? "/images/reports-active.svg" : "/images/Reports.svg"}
        alt="Reports"
        text="Reports"
        activeLink={activeLink}
      />
      <MenuItem
        href="/advertiser/panelusers"
        src={activeLink === '/advertiser/panelusers' ? "/images/paneluser-active.svg" : "/images/user_icon.svg"}
        alt="Panel User"
        text="Panel User"
        activeLink={activeLink}
      />
    </>
  );
}

import MenuItem from "../MenuItem/MenuItem";

export default function CustomerMenu() {
  return (
    <>
      <MenuItem
        href="/superadmin/dashboard"
        src="/images/Campaigns.svg"
        alt="Campaigns"
        text="Dashboard"
      />
      <MenuItem
        href="#"
        src="/images/Creative.svg"
        alt="Creative"
        text="Accounts"
      />
      <MenuItem
        href="#"
        src="/images/Reports.svg"
        alt="Reports"
        text="Reports"
      />
      <MenuItem
        href="#"
        src="/images/user_icon.svg"
        alt="Panel User"
        text="Panel User"
      />
    </>
  );
}

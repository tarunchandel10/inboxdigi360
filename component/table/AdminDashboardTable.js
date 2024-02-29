import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CustomToggle from "../toggle/CustomToggle";
import { useRouter } from "next/router";
import { changeUserStaus } from "@/pages/api/superadmin";
import { toast } from "react-toastify";

export default function AdminDashboardTable(props) {
  const router = useRouter()
  const {users} = props;

  const handleEdit = (id) => {
    router.push(`/admin/editAdvertiserForm/${id}`)
  }
  const changeStatus = (e, item, index) => {

    console.log(e.target.value)
    console.log(e.target.checked)
    console.log(item.status)

    let body =

    {
      user_id: item.id,
      email: item.email,
      status: e.target.checked ? "Active" : "InActive"
    }
    changeUserStaus(body).then((data) => {
      if (data.status) {
        toast.success(data.message, { position: 'top-center' });
      }
    }).catch(() => {

    })
  }
  return (
    <table className="table table-borderless ">
      <thead>
        <tr>
          <th></th>
          <th>ID</th>
          <th>Advertiser Name</th>
          <th>Currency</th>
          <th>Contact Person</th>
          <th>Email</th>
          <th>Markup</th>
          <th>Budget Allocated</th>
          <th>Spent</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length > 0 &&
          users.map((item,index) => {
            return (
              <tr>
                <td>
                  <input type="checkbox" id={`vehicle${item.id}`} name={`vehicle${item.id}`} value="" />
                  <label htmlFor={`vehicle${item.id}`} className="cr"></label>
                </td>
                <td>{item.id}</td>
                <td>
                  {item.fname ?? ""} {item.lname ?? ""}
                </td>
                <td>{item.currency ?? '-'}</td>
                <td>{item.mobile ?? '-'}</td>
                <td>{item.email}</td>
                <td>{item.markup}</td>
                <td>{item.inital_budget ?? "-"}</td>
                <td>{item.spent}</td>
                <td><CustomToggle status={item.status === "InActive" ? false : true} onChange={(e) => changeStatus(e, item, index)} name={index} /></td>
                <td>
                  <DropdownButton
                    key="start"
                    id={`dropdown-button-drop-start`}
                    drop="start"
                    variant="bg-transparent remove_drop_icon"
                    title={
                      <Image
                        src="/images/action.svg"
                        width={5}
                        height={20}
                        alt="1"
                      />
                    }
                  >
                    <Dropdown.Item
                      eventKey="1"
                      className="p-md-3"
                      onClick={() => handleEdit(item.id)}
                    >
                      <Image
                        src="/images/edit_icon.svg"
                        width={18}
                        height={18}
                        alt="P2"
                        className="me-3"
                      />
                      Edit
                    </Dropdown.Item>                    
                  </DropdownButton>
                </td>
              </tr>

            );
          })}
      </tbody>
    </table>
  )
}
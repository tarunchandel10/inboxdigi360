import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Image from 'next/image';
function Header() {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    setUserDetails(JSON.parse(userDetails));
  }, []);
  const router = useRouter();
  const handleLogout = () => {
    router.push('/logout');
  };
  return (
    <>
      <Navbar expand="lg" className='custom_nav'>
        <Container fluid>
          <Button className='bg-transparent border-0 menu-icon' htmlFor="sidebar-menu">
            <label htmlFor="sidebar-menu" className="menu-icon">
              <Image
                src="/images/Menu.svg"
                width={40}
                height={40}
                alt="Picture of the author"
                style={{ width: "40px", height: "40px" }}
              />
            </label>
          </Button>
          <Navbar.Brand href="/advertiser/dashboard" className='ps-4 me-0'>
            <Image
              src="/images/ad-logo.png"
              width={90}
              height={50}
              alt="Picture of the author"
              style={{ width: "90px", height: "50px" }}
            />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <div className='profile_details d-flex align-items-center'>
                <div className='basic_info text-end'>
                  <span className='num'>{userDetails?.fname + " " + userDetails?.lname}</span>
                  <p className='mail mb-0'>{userDetails?.email}</p>
                </div>
                <div className='profile_img'>
                <DropdownButton
                    key="start"
                    id={`dropdown-button-drop-start`}
                    drop="bottom"
                    variant="bg-transparent remove_drop_icon"
                    title={
                      <p>{userDetails?.fname.substring(0, 1) + "" + userDetails?.lname.substring(0, 1)}</p>
                    }
                  >
                    <Dropdown.Item
                      eventKey="1"
                      className="p-md-3"
                      onClick={handleLogout}
                    >                      
                      Logout
                    </Dropdown.Item>                   
                  </DropdownButton>
                  
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
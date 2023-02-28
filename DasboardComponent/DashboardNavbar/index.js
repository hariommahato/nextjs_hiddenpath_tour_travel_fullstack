import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineMenuFold } from "react-icons/ai";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
const DashboardNavbar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: session } = useSession();

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Button variant="primary" onClick={handleShow}>
            <AiOutlineMenuFold />
          </Button>
          <Navbar.Brand href="/dashboard">AdventureMountain</Navbar.Brand>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "red" }}> Welcome {session?.user?.email}</p>
          </div>

          <Button onClick={signOut}>Logout</Button>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                ABOUT US
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/about/add"}>
                  Add About Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/about"}>
                  View About Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                CONTACT US DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/contact"}>
                  View ContactUs Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                HOME-CAROUSEL-IMAGE-DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/carousel/add"}>
                  Add Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/carousel"}>
                  View Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                CHOOSE US DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/chooseus/add"}>
                  Add Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/chooseus"}>
                  View Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                OURSERVICES DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/ourservices/add"}
                >
                  Add Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/ourservices"}>
                  View Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                TESTIMONIAL DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/testimonial/add"}
                >
                  Add Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/testimonial"}>
                  View Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                FAQ DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/faq/add"}>
                  Add FAQ
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/faq"}>
                  View FAQ
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                TREKKING DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/trekking/add"}>
                  Add Data
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/trekking"}>
                  View Data
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                USER DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/user/add"}>
                  Add New Admin/User
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/user"}>
                  View ALL USER
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                RECENT-TOUR DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/recenttour/add"}
                >
                  Add RECENTOUR
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/recenttour"}>
                  View ALL RECENTTOUR
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                POPULAR-DESTINATION DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/populardestination/add"}
                >
                  Add PopularDestination
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/populardestination"}
                >
                  View ALL PopularDestination
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                CUSTOMIZE-TRIP DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/customizetrip"}
                >
                  View ALL CUSTOMIZE-TRIP-DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                BOOK-TRIP DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/booktrip"}>
                  View ALL BOOK-TRIP-DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                PEAKCLIMBING DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/peakclimbing/add"}
                >
                  Add PEAKCLIMBING DATA
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/peakclimbing"}>
                  View ALL PEAKCLIMBING DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                EXPEDITION DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/expedition/add"}
                >
                  Add EXPEDITION DATA
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/expedition"}>
                  View ALL PEAKCLIMBING DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                DAYEXCURSION DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/dayexcursion/add"}
                >
                  Add DAYEXCURSION DATA
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/dayexcursion"}>
                  View ALL DAYEXCURSION DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                VEHICLE-TOUR DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item
                  as={Link}
                  href={"/admin/dashboard/vehicletour/add"}
                >
                  Add VEHICLE-TOUR DATA
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/vehicletour"}>
                  View ALL VEHICLE-TOUR DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div style={{ marginTop: ".5rem" }}>
            <Dropdown style={{ width: "100%" }}>
              <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                HIKING DATA
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ width: "100%" }}>
                <Dropdown.Item as={Link} href={"/admin/dashboard/hiking/add"}>
                  Add HIKING DATA
                </Dropdown.Item>
                <Dropdown.Item as={Link} href={"/admin/dashboard/hiking"}>
                  View ALl HIKING DATA
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default DashboardNavbar;

"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import {
  useGetAnnapurnTrekDataQuery,
  useGetDayExcursionDataQuery,
  useGetEverestTrekDataQuery,
  useGetExpeditionDataQuery,

  useGetHikingDataQuery,
  useGetLangtangTrekDataQuery,
  useGetManasluTrekDataQuery,
  useGetOffBeatenTrekDataQuery,
  
  useGetPeakClimbingDataQuery,
  useGetVehicleTourDataQuery,
} from "@/services/adminInteraction";
function Header() {
  const { data: everestTrek } = useGetEverestTrekDataQuery();
  const { data: annapurnaTrek } = useGetAnnapurnTrekDataQuery();
  const { data: manasluTrek } = useGetManasluTrekDataQuery();
  const { data: langtangTrek } = useGetLangtangTrekDataQuery();
  const { data: offbeatenTrek } = useGetOffBeatenTrekDataQuery();
  const { data: peakClimbing } = useGetPeakClimbingDataQuery();
  const { data: expedition } = useGetExpeditionDataQuery();
  const { data: dayexcursion } = useGetDayExcursionDataQuery();
  const { data: vehicletour } = useGetVehicleTourDataQuery();
  const { data: hiking } = useGetHikingDataQuery();
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        height: "6rem",
      }}
      sticky="top"
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto  my-lg-0 "
            style={{
              maxHeight: "100px",
              display: "flex",
              justifyContent: "center",
            }}
            navbarScroll
          >
            <Nav.Link as={Link} href="/">
              <AiFillHome size={30} color="#289672" />
            </Nav.Link>

            <NavDropdown title="Trekking" id="navbarScrollingDropdown">
              <NavDropdown title="Everest " id="navbarScrollingDropdown">
                {everestTrek?.everestTrek?.map((data) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      href={`/trekking/${data._id}`}
                      style={{ width: "100%" }}
                      key={data._id}
                    >
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown title="Annapurna " id="navbarScrollingDropdown">
                {annapurnaTrek?.annapurnaTrek?.map((data) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      href={`/trekking/${data._id}`}
                      style={{ width: "100%" }}
                      key={data._id}
                    >
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown title="Manaslu " id="navbarScrollingDropdown">
                {manasluTrek?.manasluTrek?.map((data) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      href={`/trekking/${data._id}`}
                      style={{ width: "100%" }}
                      key={data._id}
                    >
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown title="Langtang " id="navbarScrollingDropdown">
                {langtangTrek?.langtangTrek?.map((data) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      href={`/trekking/${data.id}`}
                      style={{ width: "100%" }}
                      key={data._id}
                    >
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown
                title="Off Beaten Trek "
                id="navbarScrollingDropdown"
              >
                {offbeatenTrek?.offbeatenTrek?.map((data) => {
                  return (
                    <NavDropdown.Item
                      as={Link}
                      href={`/trekking/${data._id}`}
                      style={{ width: "100%" }}
                      key={data._id}
                    >
                      {data.name}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </NavDropdown>
            <NavDropdown title="Peak Climbing " id="navbarScrollingDropdown">
              {peakClimbing?.allPeakClimbing?.map((data) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    href={`/peakclimbing/${data._id}`}
                    style={{ width: "100%" }}
                    key={data._id}
                  >
                    {data.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown title="Expedition " id="navbarScrollingDropdown">
              {expedition?.allExpedition?.map((data) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    key={data._id}
                    href={`/expedition/${data._id}`}
                    style={{ width: "100%" }}
                  >
                    {data.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown title="Day Excursion " id="navbarScrollingDropdown">
              {dayexcursion?.allDayExcursion?.map((data) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    key={data._id}
                    href={`/dayexcursion/${data._id}`}
                    style={{ width: "100%" }}
                  >
                    {data.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown title="Vehicle Tour" id="navbarScrollingDropdown">
              {vehicletour?.allVehicleTour?.map((data) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    key={data._id}
                    href={`/vehicletour/${data._id}`}
                    style={{ width: "100%" }}
                  >
                    {data.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <NavDropdown title="Hiking " id="navbarScrollingDropdown">
              {hiking?.hiking?.map((data) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    key={data._id}
                    href={`/hiking/${data._id}`}
                    style={{ width: "100%" }}
                  >
                    {data.name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          <Nav.Link
            as={Link}
            href="/faq"
            style={{
              paddingRight: "30px",
              color: "#D32626",
              cursor: "pointer",
            }}
          >
            FAQ
          </Nav.Link>
          <Nav.Link
            as={Link}
            href="/review"
            style={{ color: "#D32626", cursor: "pointer" }}
          >
            POST A REVIEW
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;

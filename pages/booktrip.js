import { useCreateBookTripDataMutation } from "@/services/adminInteraction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
const initialState = {
  packageName: "",
  date: "",
  noofadult: "",
  noofchildren: "",
  fullname: "",
  contact: "",
  email: "",
  country: "",
  message: "",
};

const BookTrip = () => {
  const [bookTripData, setBookTripData] = useState(initialState);
  const router = useRouter();
  const {
    packageName,
    date,
    noofadult,
    noofchildren,
    fullname,
    contact,
    email,
    country,
    message,
  } = bookTripData;
  const [createBookTripData, { isSuccess, isError }] =
    useCreateBookTripDataMutation();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setBookTripData({ ...bookTripData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookTripData);
    createBookTripData(bookTripData);
    setBookTripData("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Your Data  Sent Succesfully ...!!!!!");
      router.push("/");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [isSuccess,isError,router]);
  return (
    <Card>
    <Toaster/>
      <h3>Book Your Trip</h3>
      <div style={{ margin: "1rem" }}>
        <Row style={{ display: "flex", alignItems: "center" }}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <Form.Label>Choose package</Form.Label>
            <input
              type="text"
              name="packageName"
              value={packageName}
              onChange={onInputChange}
              placeholder="Enter Adventure in which you are interested"
              style={{ width: "100%", padding: ".9rem" }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <label>Your Date for travel</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={onInputChange}
              placeholder="your date for travel"
              style={{ width: "100%", padding: ".9rem" }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="number"
              name="noofadult"
              value={noofadult}
              onChange={onInputChange}
              placeholder="No of adults"
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="number"
              value={noofchildren}
              name="noofchildren"
              onChange={onInputChange}
              placeholder="No of Children"
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <h4>Personal Information</h4>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="text"
              value={fullname}
              name="fullname"
              onChange={onInputChange}
              placeholder="Full Name"
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="number"
              value={contact}
              name="contact"
              placeholder="Contact"
              onChange={onInputChange}
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="email"
              placeholder="something@gmail.com"
              value={email}
              name="email"
              onChange={onInputChange}
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <input
              type="text"
              placeholder="Your Country"
              value={country}
              name="country"
              onChange={onInputChange}
              style={{ width: "100%", padding: "1rem" }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "1rem" }}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <Form.Control
              as="textarea"
              rows={3}
              value={message}
              name="message"
              onChange={onInputChange}
              placeholder="Any Queries ? Please Type Here"
            />
          </Col>
        </Row>

        <Button style={{ marginTop: "1rem" }} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </Card>
  );
};

export default BookTrip;

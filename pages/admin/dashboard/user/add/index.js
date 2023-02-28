
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "@/services/adminInteraction";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const initialState = {
  username: "",
  email: "",
  password: "",
};
const User = () => {
  const [userData, setUserData] = useState(initialState);
  const [registerUser, { isSuccess }] = useRegisterUserMutation();
  const router = useRouter();
  const { username, email, password } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(userData);
  };

    if (isSuccess) {
      router.push("/admin/dashboard/user");
    }
 

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <Row>
      <Col lg={6} md={12} sm={12} style={{ margin: "auto" }}>
        <Form>
          <h3>Register New Admin</h3>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Form.Group>

          <div style={{ marginTop: "1rem" }}>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default User;
User.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};


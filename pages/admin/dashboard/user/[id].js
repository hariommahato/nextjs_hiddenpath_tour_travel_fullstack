import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/services/adminInteraction";

import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
const initialState = {
  username: "",
  email: "",
  password: "",
};
export default function User() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetUserByIdQuery(id);
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const [userData, setUserData] = useState(initialState);
  const { username, email, password } = userData;

  useEffect(() => {
    setUserData({
      username: data?.user.username,
      email: data?.user.email,
      password: data?.user.password,
    });
    if (isSuccess) {
      toast.success("Updated Succesfully");
      router.push("/admin/dashboard/user");
    }
  }, [data, isSuccess,router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ id, userData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <>
      <Toaster />
      <Form>
        <h3>Update User Data</h3>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          update
        </Button>
      </Form>
    </>
  );
}
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

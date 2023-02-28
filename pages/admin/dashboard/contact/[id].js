import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import {
  useGetContactUsDataByIdQuery,
  useUpdateContactUsDataMutation,
} from "@/services/adminInteraction";
import { toast, Toaster } from "react-hot-toast";
const initialState = {
  name: "",
  phoneNumber: "",
  email: "",
  packageName: "",
  message: "",
};
export default function Contact() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetContactUsDataByIdQuery(id);

  const [updateContactUsData, { isSuccess }] = useUpdateContactUsDataMutation();
  const [contactData, setContactData] = useState(initialState);
  const { name, phoneNumber, email, packageName, message } = contactData;

  useEffect(() => {
    setContactData({
      name: data?.contact.name,
      phoneNumber: data?.contact.phoneNumber,
      packageName: data?.contact.packageName,
      email: data?.contact.email,
      message: data?.contact.message,
    });
    if (isSuccess) {
      toast.success("Updated Successfully");
      router.push("/admin/dashboard/contact");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactUsData({ id, contactData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  return (
    <>
      <Toaster />
      <Form>
        <h3>Update Contact Data</h3>
        <Form.Group className="mb-3">
          <Form.Label>Your Full Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            placeholder="phone number"
            value={phoneNumber}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            name="packageName"
            placeholder="package name"
            value={packageName}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type="text"
            name="message"
            placeholder="message "
            value={message}
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

Contact.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};


import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useGetCustomizeTripDataByIdQuery,
  useUpdateCustomizeTripDataMutation,
} from "@/services/adminInteraction";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
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
export default function CustomizeTrip() {
  const router=useRouter()
  const { id } = router.query;
  const { data } = useGetCustomizeTripDataByIdQuery(id);
  const [updateCustomizeTripData, { isSuccess,isError}] =
    useUpdateCustomizeTripDataMutation();
  const [customizeTripData, setCustomizeTripData] = useState(initialState);
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
  } = customizeTripData;
  useEffect(() => {
    setCustomizeTripData({
      packageName: data?.customizetrip.packageName,
      date: data?.customizetrip.date,
      noofadult: data?.customizetrip.noofadult,
      noofchildren: data?.customizetrip.noofchildren,
      fullname: data?.customizetrip.fullname,
      contact: data?.customizetrip.contact,
      email: data?.customizetrip.email,
      country: data?.customizetrip.country,
      message: data?.customizetrip.message,
    });
    if(isSuccess){
      toast.success("Updated Successfully")
      router.push("/admin/dashboard/customizetrip");
    }
    if(isError){
      toast.error(isError)
    }
  }, [data,isSuccess,toast,isError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomizeTripData({ id, customizeTripData });
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCustomizeTripData({ ...customizeTripData, [name]: value });
  };

  return (
    <Container>
      <Form>
        <h3>Update CustomizeTrip Data</h3>
        <Form.Group className="mb-3">
          <Form.Label>Package Name</Form.Label>
          <Form.Control
            type="text"
            name="packageName"
            value={packageName}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>No of Adult</Form.Label>
          <Form.Control
            type="text"
            name="noofadult"
            value={noofadult}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>No of Children</Form.Label>
          <Form.Control
            type="text"
            name="noofchildren"
            value={noofchildren}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>FullName</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={fullname}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            name="contact"
            value={contact}
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
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={country}
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
    </Container>
  );
}
CustomizeTrip.getLayout = function PageLayout(page) {
    return (
      <>
        <Providers>
          <DashboardNavbar />
          <SessionProvider>{page}</SessionProvider>
        </Providers>
      </>
    );
  };
  
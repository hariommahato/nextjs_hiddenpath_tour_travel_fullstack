import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useCreateRecentTourDataMutation } from "@/services/adminInteraction";
import { Col, Row } from "react-bootstrap";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";

const initialState = {
  title: "",
  description: "",
  image: "",
};
const RecentTour = () => {
  const router = useRouter();
  const [recentTourData, setRecentTourData] = useState(initialState);
  const [createRecentTourData, { isSuccess }] =
    useCreateRecentTourDataMutation();
  const { title, description, image } = recentTourData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setRecentTourData({
      ...recentTourData,
      image: response.data.data.secure_url,
    });
    toast.success("Image Added Successfuly");
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createRecentTourData(recentTourData);
    setRecentTourData("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Added Successfully..!!!");
      router.push("/admin/dashboard/recenttour");
    }
  }, [isSuccess,toast]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setRecentTourData({ ...recentTourData, [name]: value });
  };
  return (
    <Row>
    <Toaster/>
      <Col xs={12} sm={12} md={12} lg={6} style={{ margin: "auto" }}>
        <Form>
          <h3>Add RecentTour Data</h3>
          <Form.Group className="mb-3">
            <Form.Label>title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="description"
              value={description}
              onChange={onInputChange}
            />
          </Form.Group>

          <input type="file" onChange={handleOnChange} />
          <Button variant="danger" onClick={handleImageAdd}>
            Add
          </Button>
          <p style={{color:"gray"}}>Please upload Image First Then Upload Data</p>

          <Button variant="primary" type="submit" onClick={handleSubmit} className="m-3">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default RecentTour;
RecentTour.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

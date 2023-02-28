import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useCreatPopularDestinationDataMutation } from "@/services/adminInteraction";

import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

const initialState = {
  name: "",
  image: "",
};
const PopularDestination = () => {
  const [popularDestinationData, setPopularDestinationData] =
    useState(initialState);
  const [createPopularDestinationData, { isSuccess }] =
    useCreatPopularDestinationDataMutation();
  const router = useRouter();
  const { image, name } = popularDestinationData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setPopularDestinationData({
      ...popularDestinationData,
      image: response.data.data.secure_url,
    });
    toast.success("Image Added Successfully");
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPopularDestinationData(popularDestinationData);

    setPopularDestinationData("");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Added Successfully");
      router.push("/admin/dashboard/populardestination");
    }
  }, [isSuccess,toast]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPopularDestinationData({ ...popularDestinationData, [name]: value });
  };
  return (
    <Row>
      <Toaster />
      <Col xs={12} sm={12} md={12} lg={6} style={{ margin: "auto" }}>
        <Form>
          <h3>Add populardestination Data</h3>
          <Form.Group className="mb-3">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={onInputChange}
            />
          </Form.Group>

          <input type="file" onChange={handleOnChange} />
          <Button variant="primary" onClick={handleImageAdd}>
            Add
          </Button>
          <p style={{ color: "gray" }}>
            Please Upload Image First Then Upload Data
          </p>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default PopularDestination;
PopularDestination.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

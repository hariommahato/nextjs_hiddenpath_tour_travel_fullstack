import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useCreateHeroCarouselDataMutation } from "@/services/adminInteraction";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const initialState = {
  title: "",
  image: "",
  description: "",
};
const Carousel = () => {
  const [carouselData, setCarouselData] = useState(initialState);
  const [createHeroCarouselData, { isSuccess }] =
    useCreateHeroCarouselDataMutation();
  const router = useRouter();
  const { title, image, description } = carouselData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setCarouselData({ ...carouselData, image: response.data.data.secure_url });
    toast.success("Image Added Success");
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createHeroCarouselData(carouselData);
    toast.success("Carousel Data Added Success ");
    router.push("/admin/dashboard/carousel");
    setCarouselData("");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCarouselData({ ...carouselData, [name]: value });
  };
  return (
    <Row>
      <Toaster />
      <Col xs={12} sm={12} lg={6} style={{ margin: "auto" }}>
        <Form>
          <h3>Add Carousel Data</h3>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={onInputChange}
            />
          </Form.Group>
          <input type="file" onChange={handleOnChange} />
          <Button variant="danger" onClick={handleImageAdd}>
            Upload Image
          </Button>
          <p style={{ color: "gray" }}>
            Please Submit Image First then Submit Data
          </p>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Carousel;
Carousel.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

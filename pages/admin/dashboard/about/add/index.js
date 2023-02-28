import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { useCreateAboutDataMutation } from "@/services/adminInteraction";
import { toast, Toaster } from "react-hot-toast";
const initialState = {
  title: "",
  image: "",
  description: "",
};
const About = () => {
  const [aboutData, SetAboutData] = useState(initialState);

  const [selectedImage, setSelectedImage] = useState("");
  const [createAboutData, { isError, isSuccess }] =
    useCreateAboutDataMutation();
  const router = useRouter();
  const { title, image, description } = aboutData;
  const handleSubmit = (e) => {
    e.preventDefault();
    createAboutData(aboutData);
    router.push("/admin/dashboard/about");
    SetAboutData("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("About Data Added Successfully");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [isError, isSuccess,toast]);
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    SetAboutData({ ...aboutData, image: response.data.data.secure_url });
    toast.success("Added Image Success");
    return;
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    SetAboutData({ ...aboutData, [name]: value });
  };
  return (
    <Row>
      <Toaster />
      <Col lg={6} md={12} sm={12} style={{ margin: "auto" }}>
        <Form>
          <h3>Add About Data</h3>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Example:About Us"
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
          <p style={{color:"gray"}}>*********First Upload Image Then Submit Data *********</p>
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

export default About;
About.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

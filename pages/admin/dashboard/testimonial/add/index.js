import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { useCreateTestimonialDataMutation } from "@/services/adminInteraction";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useRouter } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast,Toaster} from "react-hot-toast";

const initialState = {
  name: "",
  image: "",
  comment: "",
};
const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState(initialState);
  const [createTestimonialData, { isSuccess }] =
    useCreateTestimonialDataMutation();
  const router = useRouter();
  const { name, image, comment } = testimonialData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setTestimonialData({
      ...testimonialData,
      image: response.data.data.secure_url,
    });
    toast.success("Image Added Successfully");
    return;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createTestimonialData(testimonialData);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Data Added Successfully");
      router.push("/admin/dashboard/testimonial");
    }
  }, [isSuccess, router]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData({ ...testimonialData, [name]: value });
  };
  return (
    <Row>
      <Toaster />
      <Col xs={12} sm={12} md={12} lg={6} style={{ margin: "auto" }}>
        <Form>
          <h3>Add Testimonial Data</h3>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="name"
              value={name}
              onChange={onInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              placeholder="Enter your message"
              value={comment}
              onChange={onInputChange}
            />
          </Form.Group>
          <input type="file" onChange={handleOnChange} />
          <Button variant="danger" onClick={handleImageAdd}>
            Add
          </Button>
          <p style={{ color: "gray" }}>
            Please Upload Image First then Submit Data
          </p>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Testimonial;
Testimonial.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

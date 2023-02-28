import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useCreateTestimonialDataMutation } from "@/services/adminInteraction";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { Toaster,toast } from "react-hot-toast";
const initialState = {
  name: "",
  comment: "",
  image: "",
};

const Review = () => {
  const [testimonialData, setTestimonialData] = useState(initialState);
  const router = useRouter();
 
  const { image, name, comment } = testimonialData;
  const [createTestimonialData, { isError, isSuccess }] =
    useCreateTestimonialDataMutation();
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData({ ...testimonialData, [name]: value });
  };
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
    alert.success("Image Submitted Successfully");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    createTestimonialData(testimonialData);
    router.push("/");
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Review Submitted Successfully");
    }
  }, [isSuccess]);
  return (
    <>
    <Toaster/>
      <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <h4>Hey There 👋</h4>
        <h6>Share your tour Experience</h6>
        <div>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Your name"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                as="textarea"
                placeholder="Comment "
                style={{ height: "100px" }}
                name="comment"
                value={comment}
                onChange={onInputChange}
              />
            </Form.Group>
            <p style={{ color: "gray" }}>***You have to Upload Your Image***</p>
            <div style={{ width: "100%", overflow: "hidden" }}>
              <input type="file" onChange={handleOnChange} />
              <Button variant="danger" onClick={handleImageAdd}>
                Upload Your Image
              </Button>
            </div>

            <p style={{ color: "gray" }}>
              ***After Uploading Your Image then Submit the Form***
            </p>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "1rem" }}
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default Review;

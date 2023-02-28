import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useGetTestimonialDataByIdQuery,
  useUpdateTestimonialDataMutation,
} from "@/services/adminInteraction";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const initialState = {
  name: "",
  comment: "",
  image: "",
};
export default function Testimonial() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetTestimonialDataByIdQuery(id);
  const [updateTestimonialData, { isSuccess, isError }] =
    useUpdateTestimonialDataMutation();
  const [testimonialData, setTestimonialData] = useState(initialState);

  const { name, comment, image } = testimonialData;
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

  useEffect(() => {
    setTestimonialData({
      name: data?.testimonial.name,
      comment: data?.testimonial.comment,
      image: data?.testimonial.image,
    });
    if (isSuccess) {
      toast.success("Data Submitted Successfully");
      router.push("/admin/dashboard/testimonial");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [data, isSuccess, isError,router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTestimonialData({ id, testimonialData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTestimonialData({ ...testimonialData, [name]: value });
  };

  return (
    <>
      <Toaster />
      <Form>
        <h3>update Testimonial Data</h3>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="comment"
            placeholder="your comment"
            value={comment}
            onChange={onInputChange}
          />
        </Form.Group>
        <input type="file" onChange={handleOnChange} />
        <Button variant="danger" onClick={handleImageAdd}>
          Add
        </Button>
        <p style={{ color: "gray" }}>
          Please Upload Image First Then Upload Data
        </p>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

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

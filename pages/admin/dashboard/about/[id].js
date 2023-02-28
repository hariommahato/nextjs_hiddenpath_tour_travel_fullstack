import { useEffect, useReducer, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { toast, Toaster } from "react-hot-toast";
import {
  useGetAboutUsDataByIdQuery,
  useUpdateAboutDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
const initialState = {
  title: "",
  description: "",
  image: "",
};
export default function About() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isSuccess, isError } = useGetAboutUsDataByIdQuery(id);
  const [updateAboutData] = useUpdateAboutDataMutation();
  const [aboutData, setAboutData] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState("");
  const { title, description, image } = aboutData;
  useEffect(() => {
    setAboutData({
      title: data?.aboutUs.title,
      description: data?.aboutUs.description,
      image: data?.aboutUs.image,
    });
    if (isSuccess) {
      toast.success("Successfully Updated Data");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [isSuccess,isError]);

  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setAboutData({ ...aboutData, image: response.data.data.secure_url });
    toast.success("Image Added Success");
    return;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAboutData({ id, aboutData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setAboutData({ ...aboutData, [name]: value });
  };
  return (
    <>
      <Toaster />
      <Form>
        <h3>Add About Data</h3>
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
            placeholder="description"
            value={description}
            onChange={onInputChange}
          />
        </Form.Group>
        <input type="file" onChange={handleOnChange} />
        <Button variant="primary" onClick={handleImageAdd}>
          Add
        </Button>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

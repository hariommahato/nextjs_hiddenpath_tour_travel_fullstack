import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import {
  useGetOurServicesDataByIdQuery,
  useUpdateOurServicesDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const initialState = {
  title: "",
  description: "",
  image: "",
};
import { Toaster, toast } from "react-hot-toast";
export default function OurServices() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetOurServicesDataByIdQuery(id);
  const [updateOurServicesData, { isSuccess }] =
    useUpdateOurServicesDataMutation();
  const [ourServicesData, setOurServicesData] = useState(initialState);
  const { title, description, image } = ourServicesData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setOurServicesData({
      ...ourServicesData,
      image: response.data?.data?.secure_url,
    });
    toast.success("Image Updated Success");
    return;
  }
  useEffect(() => {
    setOurServicesData({
      title: data?.ourServices.title,
      description: data?.ourServices.description,
      image: data?.ourServices.image,
    });
    if (isSuccess) {
      toast.success("Data Updated Successfully");
      router.push("/admin/dashboard/ourservices")
    }
  }, [data, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateOurServicesData({ id, ourServicesData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOurServicesData({ ...ourServicesData, [name]: value });
  };

  return (
    <>
      <Form>
        <h3>update ourServices Data</h3>
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
        <Button variant="danger" onClick={handleImageAdd}>
          Upload Image
        </Button>
        <p style={{color:"gray"}}>Please Upload Image First then  Upload Data</p>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
}

OurServices.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

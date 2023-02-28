
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import {
  useGetPopularDestinationDataByIdQuery,
  useUpdatePopularDestinationDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";

import { SessionProvider } from "next-auth/react";
const initialState = {
  image: "",
  name: "",
};
export default function PopularDestination() {
  const router=useRouter()
  const { id } =router.query
  const { data } = useGetPopularDestinationDataByIdQuery(id);
  const [updatePopularDestinationData, { isSuccess }] =
    useUpdatePopularDestinationDataMutation();
  const [popularDestinationData, setPopularDestinationData] =
    useState(initialState);
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
    alert("success");
    return;
  }

  useEffect(() => {
    setPopularDestinationData({
      name: data?.popularDestination.name,
      image: data?.popularDestination.image,
    });
  }, [data]);

  if (isSuccess) {
    router.push("/admin/dashboard/populardestination");
    console.log("success");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePopularDestinationData({ id, popularDestinationData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPopularDestinationData({ ...popularDestinationData, [name]: value });
  };

  return (
    <>
      <Form>
        <h3>update popularDestination Data</h3>
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

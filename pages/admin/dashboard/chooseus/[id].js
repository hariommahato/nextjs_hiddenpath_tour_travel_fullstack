import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import {
  useGetChooseUsDataByIdQuery,
  useUpdateChooseUsDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const initialState = {
  title: "",
  image: "",
};
export default function ChooseUs() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetChooseUsDataByIdQuery(id);
  const [updateChooseUsData, { isSuccess }] = useUpdateChooseUsDataMutation();
  const [chooseUsData, setChooseUsData] = useState(initialState);
  const { title, image } = chooseUsData;
  const [selectedImage, setSelectedImage] = useState("");
  function handleOnChange(e) {
    setSelectedImage(e.target.files[0]);
  }
  async function handleImageAdd() {
    const formData = formDataFactory(selectedImage, "reactupload");
    const response = await uploadImage(formData);
    setChooseUsData({ ...chooseUsData, image: response.data.data.secure_url });
    alert("success");
    return;
  }
  useEffect(() => {
    setChooseUsData({
      title: data?.chooseUs.title,
      description: data?.chooseUs.description,
      image: data?.chooseUs.image,
    });
  }, [data]);

  if (isSuccess) {
    router.push("/admin/dashboard/chooseus");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateChooseUsData({ id, chooseUsData });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setChooseUsData({ ...chooseUsData, [name]: value });
  };

  return (
    <>
      <Form>
        <h3>update ChooseUs Data</h3>
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
ChooseUs.getLayout = function PageLayout(page) {
    return (
      <>
        <Providers>
          <DashboardNavbar/>
          <SessionProvider>{page}</SessionProvider>
        </Providers>
      </>
    );
  };
  
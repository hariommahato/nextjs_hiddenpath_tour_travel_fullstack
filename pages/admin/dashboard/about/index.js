import React, { useEffect } from "react";
import {
  useDeleteAboutDataMutation,
  useGetAboutUsDataQuery,
} from "../../../../services/adminInteraction";
import Button from "react-bootstrap/Button";
import { Card, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Spinner from "react-bootstrap/Spinner";
import Link from "next/link";
import { Providers } from "@/services/provider";
import { SessionProvider } from "next-auth/react";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { toast, Toaster } from "react-hot-toast";
const About = () => {
  const router = useRouter;
  const { data, isLoading } = useGetAboutUsDataQuery();
  const [deleteAboutData, { isSuccess }] = useDeleteAboutDataMutation();

  const handleDeleteClick = async (id) => {
    await deleteAboutData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully");
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <div>
      <Toaster />

      {data?.allAboutUs?.map((data) => {
        return (
          <Col key={data._id}>
            <Card>
              <Card.Img
                variant="top"
                src={data.image}
                style={{ height: "10rem", width: "10rem", margin: "auto" }}
              />
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
                <Link href={`/admin/dashboard/about/${data._id}`}>
                  <Button variant="danger">Edit</Button>
                </Link>

                <Button
                  variant="outlined"
                  style={{ marginLeft: "10rem" }}
                  onClick={() => {
                    handleDeleteClick(`${data._id}`);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </div>
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

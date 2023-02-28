import React, { useEffect } from "react";
import {
  useDeleteTestimonialDataMutation,
  useGetTestimonialDataQuery,
} from "@/services/adminInteraction";
import Button from "react-bootstrap/Button";
import { Card, Col } from "react-bootstrap";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const Testimonial = () => {
  const { data, isLoading } = useGetTestimonialDataQuery();
  const [deleteTestimonialData, { isSuccess }] =
    useDeleteTestimonialDataMutation();
  const handleDeleteClick = async (id) => {
    await deleteTestimonialData(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully");
    }
  },[isSuccess]);
  return (
    <>
      {isLoading ? (
        <p style={{ color: "red", fontSize: "2rem" }}>Loading... please wait</p>
      ) : (
        <div>

        <Toaster/>
          {data?.allTestimonial?.map((data) => {
            return (
              <Col key={data._id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={data.image}
                    style={{ height: "10rem", width: "10rem", margin: "auto" }}
                  />
                  <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.comment}</Card.Text>
                    <Link href={`/admin/dashboard/testimonial/${data._id}`}>
                      <Button variant="danger" >Edit</Button>
                    </Link>

                    <Button
                      variant="primary"
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
      )}
    </>
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

import React, { useEffect } from "react";
import {
  useDeleteHeroCarouselDataMutation,
  useGetHeroCarouselDataQuery,
} from "@/services/adminInteraction";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { Card, Col } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const Carousel = () => {
  const router = useRouter;
  const { data, isLoading } = useGetHeroCarouselDataQuery();
  const [deleteHeroCarouselData, { isSuccess }] =
    useDeleteHeroCarouselDataMutation();
  const handleDeleteClick = async (id) => {
    await deleteHeroCarouselData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully");
    }
  }, [isSuccess, toast]);

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Spinner animation="border" variant="danger" />
      ) : (
        <div>
          {data?.allCarousel?.map((data) => {
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
                    <Link href={`/admin/dashboard/carousel/${data._id}`}>
                      <Button variant="danger">Edit</Button>
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

export default Carousel;
Carousel.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

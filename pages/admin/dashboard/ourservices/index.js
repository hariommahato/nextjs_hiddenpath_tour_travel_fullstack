import React, { useEffect } from "react";
import {
  useDeleteOurServicesDataMutation,
  useGetOurServicesDataQuery,
} from "@/services/adminInteraction";
import Button from "react-bootstrap/Button";
import { Card, Col } from "react-bootstrap";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

const OurServices = () => {
  const { data, isLoading } = useGetOurServicesDataQuery();
  const [deleteOurServicesData, { isSuccess }] =
    useDeleteOurServicesDataMutation();
  const handleDeleteClick = async (id) => {
    await deleteOurServicesData(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully..!!!");
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading ? (
        <p style={{ color: "red", fontSize: "2rem" }}>Loading... please wait</p>
      ) : (
        <div>
          <Toaster />
          {data?.allOurServices?.map((data) => {
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
                    <Link href={`/admin/dashboard/ourservices/${data._id}`}>
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

export default OurServices;
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

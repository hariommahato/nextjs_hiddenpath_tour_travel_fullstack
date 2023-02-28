
import React, { useEffect } from "react";
import {
  useDeleteChooseUsDataMutation,
  useGetChooseUsDataQuery,
} from "@/services/adminInteraction";
import Button from "react-bootstrap/Button";
import { Card, Col } from "react-bootstrap";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const ChooseUs = () => {

  const { data, isLoading } = useGetChooseUsDataQuery();
  const [deleteChooseUsData] = useDeleteChooseUsDataMutation();

  const handleDeleteClick = async (id) => {
    await deleteChooseUsData(id);
  };
 

  return (
    <>
      {isLoading ? (
        <p style={{ color: "red", fontSize: "2rem" }}>Loading... please wait</p>
      ) : (
        <div>
          {data?.allChooseUs.map((data) => {
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
                    <Link href={`/admin/dashboard/chooseus/${data._id}`}>
                      <Button>Edit</Button>
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

export default ChooseUs;
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


import { useGetAboutUsDataQuery } from "@/services/adminInteraction";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Row } from "react-bootstrap";
const HeroAbout = () => {
  const router = useRouter();
  const {data}=useGetAboutUsDataQuery()
  return (
    <Container style={{ marginTop: "3rem " }}>
      {}
     
      {data?.allAboutUs?.map((item) => {
        return (
          <Row key={item._id}>
            <Col xs={12} md={6} lg={6} style={{ height: "20rem" }}>
           
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  height: "100%",
                  backgroundSize: "cover",
                  borderRadius: "25px",
                }}
              ></div>
            </Col>
            <Col>
            <h1 style={{ color: "gray" }}>About Us</h1>
              <h4 style={{ color: "gray" }}>{item.title}</h4>
              <p style={{ color: "GrayText" }}>
                {`${item.description}`.slice(0, 400) + "..."}
              </p>
              <Button
                variant="danger"
                size="sm"
                color="danger"
                onClick={() => {
                  router.push("/about");
                }}
              >
                Read More
              </Button>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default HeroAbout;

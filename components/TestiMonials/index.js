
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, Controller, FreeMode, Pagination } from "swiper";
import { Container, Card } from "react-bootstrap";
import { useGetTestimonialDataQuery } from "@/services/adminInteraction";
function TestiMonials() {
  const {data}=useGetTestimonialDataQuery()

  return (
    <Container style={{ marginTop: "3rem", marginBottom: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "gray" }}>Our Testimonial </h1>
      <Swiper
      
        breakpoints={{
          0: {
            slidesPerView: "1",
          },
          600: {
            slidesPerView: "2",
          },
          900: {
            slidesPerView: "4",
          },
        }}
       
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination,Controller,Autoplay]}
        className="mySwiper"
      >
        {data?.allTestimonial?.map((data) => {
          return (
            <SwiperSlide key={data._id}>
              <Card
                style={{
                  width: "auto",
                 height:"19vmax",border:"none"
                }}
              >
                <Card.Img
                  variant="top"
                  src={data.image}
                  style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height:"8vmax",
                    width:"8vmax",
                    borderRadius:"50%",
                    margin:"auto",
                    padding:"1rem"

                  }}
                />
                <Card.Body>
                  <Card.Title  style={{textAlign:"center"}}>{data?.name}</Card.Title>
                  <Card.Text  style={{textAlign:"center"}}>{`${data?.comment}`.slice(0, 10)}</Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

export default TestiMonials;

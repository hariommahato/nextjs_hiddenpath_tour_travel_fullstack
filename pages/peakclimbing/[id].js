
import Carousel from "react-bootstrap/Carousel";
import { Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import styles from "@/Styles/PeakClimbing.module.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination,Autoplay } from "swiper";
import Link from "next/link";
import { Card } from "react-bootstrap";
import { useGetPeakClimbingDataByIdQuery, useGetPeakClimbingDataQuery } from "@/services/adminInteraction";
import TripBookForm from "@/components/TripBookForm";
import { useRouter } from "next/router";
export default function Page() {
  const router=useRouter()
  const {id}=router.query
  {console.log(id)}
  const { data ,isFetching} = useGetPeakClimbingDataByIdQuery(id);
  const peakclimbing = useGetPeakClimbingDataQuery();
  return (
    <div className={styles.mainDiv}>
      <div className={styles.left}>
        <h1>{data?.peakclimbing?.name}</h1>
        <Carousel variant="dark">
          {data?.peakclimbing?.homeImageCarousel?.map((data) => {
            return (
              <Carousel.Item key={data.carouselImage} style={{maxHeight:"500px"}}>
                <img
                  className="d-block w-100"
                  src={data.carouselImage}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })}
        </Carousel>

        <div>
        {/* yaha nira maegin */}
          <div style={{ textAlign: "justify",marginTop:"2rem"}}>
            <h3>Trip OverView</h3>
            {/* yana  nira color */}
            <p style={{color:"gray"}}>{data?.peakclimbing?.overview}</p>
          </div>
          {/* margin            */}
          <div style={{marginTop:"2rem"}}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th colSpan={"2"}>Highlights</th>
                </tr>
              </thead>
              <tbody>
                {data?.peakclimbing?.highlights?.map((data) => {
                  return (
                    <tr key={data.highlightsTitle}>
                    {/* COlor */}
                      <td style={{color:"gray"}}>{data.highlightsTitle}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          {/*margin */}
          <div style={{ textAlign: "justify",marginTop:"2rem" }}>
            <h5>Comprehensive Guide</h5>
            {/* Color  */}
            <p style={{color:"gray"}}> {data?.peakclimbing?.comprehensiveGuide}</p>
          </div>
{/* margin */}
          <div style={{ textAlign: "center",marginTop:"2rem"}}>
            <h1 className="text-center">You will See </h1>
            <Carousel
              variant="dark"
              style={{ minHeight: "15rem" }}
              indicators={false}
            >
              {data?.peakclimbing?.tourImages?.map((data) => {
                return (
                  <Carousel.Item key={data.tourImage}>
                    <div
                      style={{
                        width: "50%",
                        margin: "auto",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <img
                          className=""
                          src={data.tourImage}
                          alt="First slide"
                          style={{
                            width: "10rem",
                            height: "10rem",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          <h5>Itinerary</h5>

          <Accordion defaultActiveKey="0" flush>
            {data?.peakclimbing?.itinerary?.map((item) => {
              return (
                <>
                  <Accordion.Item eventKey={Math.random() * 24234}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    {/* color */}
                    <Accordion.Body style={{color:"gray"}}>{item.description}</Accordion.Body>
                  </Accordion.Item>
                </>
              );
            })}
          </Accordion>
        </div>
        <div>
          <h5>Tour Maps</h5>
          <div style={{ width: "100%", height: "400px", overflow: "scroll" }}>
            <img src={data?.peakclimbing?.map} width={"100%"} alt="map" />
          </div>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={"2"}>Cost Details /Price Includes</th>
              </tr>
            </thead>
            <tbody>
              {data?.peakclimbing?.priceIncluded?.map((item) => {
                return (
                  <tr key={item.priceIncludedItem}>
                  {/* color */}
                    <td style={{color:"gray"}}>{item.priceIncludedItem}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={"2"}>Cost Details /Price Includes</th>
              </tr>
            </thead>
            <tbody>
              {data?.peakclimbing?.priceExcluded?.map((item) => {
                return (
                  <tr key={item.priceExcludedItem}>
                  {/* color */}
                    <td style={{color:"gray"}}>{item.priceExcludedItem}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <h5>Useful Info</h5>
          {data?.peakclimbing?.usefulInfo?.map((item) => {
            return (
              <div key={item.usefulInfoTitle}>
                <h5>{item.usefulInfoTitle}</h5>
                {/* color */}
                <p style={{color:"gray"}}>{item.usefulInfoDescription}</p>
              </div>
            );
          })}
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={"2"}>First Aid Kit</th>
              </tr>
            </thead>
            <tbody>
              {data?.peakclimbing?.firstAidKit?.map((item) => {
                return (
                  <tr key={item.firstAidKitItem}>
                  {/* color */}
                    <td style={{color:"gray"}}> {item.firstAidKitItem}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th colSpan={"2"}>Equipment And Packing List</th>
              </tr>
            </thead>
            <tbody>
              {data?.peakclimbing?.equipment?.map((item) => {
                return (
                  <tr key={item.equipmentItem}>
                  {/* colot */}
                    <td style={{color:"gray"}}>  {item.equipmentItem}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        {/* margin */}
        <div style={{marginTop:"2rem"}}>
          <h5>Expreience Required</h5>
          <p style={{color:"gray"}}>{data?.peakclimbing?.experienceRequired}</p>
        </div>
        <div style={{marginTop:"2rem"}}>
          <h5>Best Time To Travel</h5>
          <p style={{color:"gray"}}>{data?.peakclimbing?.bestTimeToTravel}</p>
        </div>
        <div style={{marginTop:"2rem"}}>
          <h5>Visa And Entry Procedures</h5>
          <p style={{color:"gray"}}>{data?.peakclimbing?.visaAndEntryProcedure}</p>
        </div>
        <div style={{marginTop:"2rem"}}>
          <h5>Our  Guides/Leaders </h5>

          <Table striped bordered hover>
            <tbody>
              {data?.peakclimbing?.ourGuides?.map((item) => {
                return (
                  <tr key={item.guidesTitle}>
                  {/* color */}
                    <td style={{color:"gray"}}> {item.guidesTitle}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
          <h1 style={{ textAlign: "center" }}>Similar Peakclimbing </h1>
          <Swiper
            breakpoints={{
              0: {
                slidesPerView: "1",
              },
              600: {
                slidesPerView: "2",
              },
              900: {
                slidesPerView: "3",
              },
            }}
            autoplay={{delay:5000,
              disableOnInteraction: false}}
            loop={true}
            slidesPerView={3}
            spaceBetween={20}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode, Pagination,Autoplay]}
            className="mySwiper"
          >
            {peakclimbing?.data?.allPeakClimbing?.map((data) => {
              return (
                <SwiperSlide key={data._id}>
                  <Link href={`/trekking/${data._id}`}>
                    <Card style={{ width: "18rem" }} className={styles.card}>
                      <Card.Img
                        variant="top"
                        src={data?.tourImages[0]?.tourImage}
                      />
                      <Card.Body>
                        <Card.Title>{data.name}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        
        </div>
      </div>

      <div>
       
      <TripBookForm
          price={data?.peakclimbing?.price}
          discount={data?.peakclimbing?.discount}
        />
      </div>
    </div>
  );
}

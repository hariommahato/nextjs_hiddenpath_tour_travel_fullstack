import { uploadImage } from "@/services/upload";
import { formDataFactory } from "@/helpers/factories";
import { useEffect, useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  useGetDayExcursionDataByIdQuery,
  useUpdateDayExcursionDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";

export default function DayExcursion() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetDayExcursionDataByIdQuery(id);
  const [updateDayExcursionData, { isSuccess, isError }] =
    useUpdateDayExcursionDataMutation();
  const [highlights, setHighlights] = useState([]);
  const [usefulInfo, setUsefulInfo] = useState([]);
  const [homeImageCarousel, setHomeImageCarousel] = useState([]);
  const [tourImages, setTourImages] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [priceExcluded, setPriceExcluded] = useState([]);
  const [priceIncluded, setPriceIncluded] = useState([]);
  const [firstAidKit, setFirstAidKit] = useState([]);
  const [usefulInfoTitle, setUsefulInfoTitle] = useState("");
  const [country, setCountry] = useState("");
  const [discount, setDiscount] = useState("");

  const [usefulInfoDescription, setUsefulInfoDescription] = useState("");
  const [highlightsTitle, setHighlightsTitle] = useState();
  const [name, setName] = useState("");
  const [totalTime, setTotalTime] = useState();
  const [price, setPrice] = useState();
  const [overview, setOverview] = useState("");
  const [comprehensiveGuide, setComprehensiveGuide] = useState("");
  const [map, setMap] = useState("");
  const [itineraryTitle, setItineraryTitle] = useState("");
  const [itineraryDescription, setItineraryDescription] = useState("");
  const [priceIncludedItem, setPriceIncludedItem] = useState("");
  const [priceExcludedItem, setPriceExcludeditem] = useState("");
  const [firstAidKitItem, setFirstAidKitItem] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [equipmentItem, setEquipmentItem] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [bestTimeToTravel, setBestTimeToTravel] = useState("");
  const [visaAndEntryProcedure, setVisaAndEntryProcedure] = useState("");
  const [guidesTitle, setGuidesTitle] = useState("");
  const [ourGuides, setOurGuides] = useState([]);
  const [image, setImage] = useState("");
  useEffect(() => {
    setMap(data?.dayexcursion?.map);
    setName(data?.dayexcursion?.name);
    setTotalTime(data?.dayexcursion?.totalTime);
    setPrice(data?.dayexcursion?.price);
    setDiscount(data?.dayexcursion?.discount);
    setOverview(data?.dayexcursion?.overview);
    setComprehensiveGuide(data?.dayexcursion?.comprehensiveGuide);
    setExperienceRequired(data?.dayexcursion?.experienceRequired);
    setBestTimeToTravel(data?.dayexcursion?.bestTimeToTravel);
    setVisaAndEntryProcedure(data?.dayexcursion?.visaAndEntryProcedure);
    setHomeImageCarousel(data?.dayexcursion?.homeImageCarousel);
    setHighlights(data?.dayexcursion?.highlights);
    setTourImages(data?.dayexcursion?.tourImages);
    setItinerary(data?.dayexcursion?.itinerary);
    setPriceIncluded(data?.dayexcursion?.priceIncluded);
    setPriceExcluded(data?.dayexcursion?.priceExcluded);
    setUsefulInfo(data?.dayexcursion?.usefulInfo);
    setCountry(data?.dayexcursion?.country);

    setFirstAidKit(data?.dayexcursion?.firstAidKit);
    setEquipment(data?.dayexcursion?.equipment);
    setOurGuides(data?.dayexcursion?.ourGuides);
  }, [data]);
  {
    console.log(isError);
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated Successfully");
      router.push("/admin/dashboard/dayexcursion");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [isSuccess, toast, isError]);

  const handleUpdateData = () => {
    updateDayExcursionData({
      id,
      name: name,
      totalTime: totalTime,
      price: price,
      discount: discount,
      overview: overview,
      comprehensiveGuide: comprehensiveGuide,
      map: map,
      homeImageCarousel: homeImageCarousel,
      highlights: highlights,
      tourImages: tourImages,
      itinerary: itinerary,
      priceIncluded: priceIncluded,
      priceExcluded: priceExcluded,
      usefulInfo: usefulInfo,
      country: country,
      firstAidKit: firstAidKit,
      ourGuides: ourGuides,
      equipment: equipment,
      visaAndEntryProcedure: visaAndEntryProcedure,
      bestTimeToTravel: bestTimeToTravel,
      experienceRequired: experienceRequired,
    });
  };
  function handleOnChange(e) {
    setImage(e.target.files[0]);
  }
  async function handleMapAdd() {
    const formData = formDataFactory(image, "reactupload");
    const response = await uploadImage(formData);
    setMap(response.data.data.url);
    toast.success("Map Updated Success");
    return;
  }
  async function handleHomeImageCarousel() {
    const formData = formDataFactory(image, "reactupload");
    const response = await uploadImage(formData);
    setHomeImageCarousel([
      ...homeImageCarousel,
      { carouselImage: response.data.data.url },
    ]);
    toast.success("CarouselImage Added Success");
    return;
  }
  async function handleTourImage() {
    const formData = formDataFactory(image, "reactupload");
    const response = await uploadImage(formData);
    setTourImages([...tourImages, { tourImage: response.data.data.url }]);
    toast.success("TourImage Updated");
    return;
  }
  return (
    <>
      <Toaster />
      <Container>
        <Row>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h4>Tour Name</h4>
            <Form.Control
              type="text"
              value={name}
              name="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h4>Total No of Days</h4>
            <Form.Control
              type="number"
              value={totalTime}
              name="totalTime"
              onChange={(e) => {
                setTotalTime(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h4>Price</h4>
            <Form.Control
              type="number"
              value={price}
              name="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <h4>Discount</h4>
            <Form.Control
              type="number"
              value={discount}
              name="discount"
              onChange={(e) => {
                setDiscount(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <h4>Overview</h4>
            <Form.Control
              as={"textarea"}
              type="text"
              value={overview}
              name="overview"
              onChange={(e) => {
                setOverview(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <h4>ComprehensiveGuide</h4>
            <Form.Control
              as={"textarea"}
              type="text"
              value={comprehensiveGuide}
              name="comprehensiveGuide"
              onChange={(e) => {
                setComprehensiveGuide(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <h4>Country</h4>
            <Form.Control
              type="text"
              value={country}
              name="country"
              onChange={(e) => {
                setCountry(e.target.value.toLocaleLowerCase());
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <h4>ExperienceRequired</h4>
            <Form.Control
              as={"textarea"}
              type="text"
              value={experienceRequired}
              name="experienceRequires"
              onChange={(e) => {
                setExperienceRequired(e.target.value);
              }}
            />
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <h4>Best Time To Travel</h4>
            <Form.Control
              as={"textarea"}
              type="text"
              value={bestTimeToTravel}
              name="bestTimeToTravel"
              onChange={(e) => {
                setBestTimeToTravel(e.target.value);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={6} lg={4}>
            <h4>Visa And Entry Procedure</h4>
            <Form.Control
              as={"textarea"}
              type="text"
              value={visaAndEntryProcedure}
              name="visaAndEntryProcedure"
              onChange={(e) => {
                setVisaAndEntryProcedure(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Tour Map</h4>
            <img src={map} style={{ height: "100px", width: "100px" }} />
            <h4>
              Change Map
              <input type="file" onChange={handleOnChange} />
            </h4>
          </Col>
          <div style={{ marginTop: "0.3rem" }}>
            <Button onClick={handleMapAdd}>Add</Button>
          </div>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h4>Home Image Carousel</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              {homeImageCarousel?.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item.carouselImage}
                    alt="/"
                    style={{ height: "100px", width: "100px" }}
                  />
                );
              })}
            </div>
            <div>
              <h4>Add homeImageCarousel</h4>
              <input type="file" onChange={handleOnChange} />
            </div>
            <div style={{ marginTop: "0.3rem" }}>
              <Button onClick={handleHomeImageCarousel}>Add</Button>
            </div>
          </Col>
        </Row>
        <Button
          style={{ marginTop: "1rem" }}
          variant="danger"
          onClick={() => {
            setHomeImageCarousel([]);
          }}
        >
          Delete Home Image Carousel
        </Button>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6}>
            <h4>Tour Images</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              {tourImages?.map((item, index) => {
                return (
                  <img
                    key={index}
                    src={item.tourImage}
                    alt="/"
                    style={{ height: "100px", width: "100px" }}
                  />
                );
              })}
            </div>
            <div>
              <h4>Add TourImage</h4>
              <input type="file" onChange={handleOnChange} />
            </div>
            <div>
              <Button onClick={handleTourImage}>Add</Button>
            </div>
            <div>
              <Button
                style={{ marginTop: "1rem" }}
                variant="danger"
                onClick={() => {
                  setTourImages([]);
                }}
              >
                Delete TourImages
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <h4>Highlight</h4>
          <Col>
            {highlights?.map((item, index) => {
              return (
                <div key={item.highlightsTitle}>
                  <Form.Control
                    type="text"
                    value={item.highlightsTitle}
                    name="highlightsTitle"
                  />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setHighlights([]);
              }}
            >
              Delete Highlights
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={highlightsTitle}
              name="highlightsTitle"
              onChange={(e) => {
                setHighlightsTitle(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setHighlights([
                  ...highlights,
                  { highlightsTitle: highlightsTitle },
                ]);
                setHighlightsTitle("");
              }}
            >
              Add New Highlights
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>Itinerary</h4>
          <Col>
            {itinerary?.map((item, index) => {
              return (
                <div key={item.title}>
                  <p>Title:{item.title}</p>
                  <p>Description:{item.description}</p>
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setItinerary([]);
              }}
            >
              Delete Itinerary
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={itineraryTitle}
              name="itineraryTitle"
              onChange={(e) => {
                setItineraryTitle(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              value={itineraryDescription}
              name="itineraryDescription"
              onChange={(e) => {
                setItineraryDescription(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setItinerary([
                  ...itinerary,
                  { title: itineraryTitle, description: itineraryDescription },
                ]);
                setItineraryTitle("");
                setItineraryDescription("");
              }}
            >
              Add New Itinerary
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>PriceIncluded</h4>
          <Col>
            {priceIncluded?.map((item, index) => {
              return (
                <div key={item.priceIncludedItem}>
                  <Form.Control type="text" value={item.priceIncludedItem} />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setPriceIncluded([]);
              }}
            >
              Delete PriceIncluded
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={priceIncludedItem}
              name="priceIncludedItem"
              onChange={(e) => {
                setPriceIncludedItem(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setPriceIncluded([
                  ...priceIncluded,
                  { priceIncludedItem: priceIncludedItem },
                ]);
                setPriceIncludedItem("");
              }}
            >
              Add New PriceIncluded Item
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>PriceExcluded</h4>
          <Col>
            {priceExcluded?.map((item, index) => {
              return (
                <div key={item.priceExcludedItem}>
                  <Form.Control type="text" value={item.priceExcludedItem} />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setPriceExcluded([]);
              }}
            >
              Delete PriceExcluded
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={priceExcludedItem}
              name="priceExcludedItem"
              onChange={(e) => {
                setPriceExcludeditem(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setPriceExcluded([
                  ...priceExcluded,
                  { priceExcludedItem: priceExcludedItem },
                ]);
                setPriceExcludeditem("");
              }}
            >
              Add New PriceExcluded Item
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>UsefulInfo</h4>
          <Col>
            {usefulInfo?.map((item, index) => {
              return (
                <div key={item.usefulInfoTitle}>
                  <p>Title:{item.usefulInfoTitle}</p>
                  <p>Description:{item.usefulInfoDescription}</p>
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setUsefulInfo([]);
              }}
            >
              Delete UsefulInfo
            </Button>
          </Col>
          {console.log(equipment)}
          {console.log(experienceRequired)}
          {console.log(visaAndEntryProcedure)}
          {console.log(bestTimeToTravel)}
          {console.log(ourGuides)}
          <Col>
            <Form.Control
              type="text"
              value={usefulInfoTitle}
              name="usefulInfoTitle"
              onChange={(e) => {
                setUsefulInfoTitle(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              value={usefulInfoDescription}
              name="usefulInfoDescription"
              onChange={(e) => {
                setUsefulInfoDescription(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setUsefulInfo([
                  ...usefulInfo,
                  {
                    usefulInfoTitle: usefulInfoTitle,
                    usefulInfoDescription: usefulInfoDescription,
                  },
                ]);
                setUsefulInfoTitle("");
                setUsefulInfoDescription("");
              }}
            >
              Add New UsefulInfo
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>FirstAidKit</h4>
          <Col>
            {firstAidKit?.map((item, index) => {
              return (
                <div key={item.firstAidKitItem}>
                  <Form.Control
                    type="text"
                    value={item.firstAidKitItem}
                    name="firstAidKitItem"
                    readOnly
                  />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setFirstAidKit([]);
              }}
            >
              Delete FirstAidKit
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={firstAidKitItem}
              name="firstAidKitItem"
              onChange={(e) => {
                setFirstAidKitItem(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setFirstAidKit([
                  ...firstAidKit,
                  { firstAidKitItem: firstAidKitItem },
                ]);
                setFirstAidKitItem("");
              }}
            >
              Add New FirstAidKit
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>Equipment And Packaging List</h4>
          <Col>
            {equipment?.map((item, index) => {
              return (
                <div key={item.equipmentItem}>
                  <Form.Control
                    type="text"
                    value={item.equipmentItem}
                    name="equipmentItem"
                    readOnly
                  />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setEquipment([]);
              }}
            >
              Delete Equipment
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={equipmentItem}
              name="equipmentItem"
              onChange={(e) => {
                setEquipmentItem(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setEquipment([...equipment, { equipmentItem: equipmentItem }]);
                setEquipmentItem("");
              }}
            >
              Add New Equipment
            </Button>
          </Col>
        </Row>

        <Row>
          <h4>Our Guides</h4>
          <Col>
            {ourGuides?.map((item, index) => {
              return (
                <div key={item.guidesTitle}>
                  <Form.Control
                    type="text"
                    value={item.guidesTitle}
                    name="guidesTitle"
                    readOnly
                  />
                </div>
              );
            })}
            <Button
              style={{ marginTop: "1rem" }}
              variant="danger"
              onClick={() => {
                setOurGuides([]);
              }}
            >
              Delete OurGuides
            </Button>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={guidesTitle}
              name="guidesTitle"
              onChange={(e) => {
                setGuidesTitle(e.target.value);
              }}
            />

            <Button
              onClick={() => {
                setOurGuides([...ourGuides, { guidesTitle: guidesTitle }]);
                setGuidesTitle("");
              }}
            >
              Add New GuidesItem
            </Button>
          </Col>
        </Row>

        <Button onClick={handleUpdateData} style={{marginTop:"0.4rem"}}>Update Data</Button>
      </Container>
    </>
  );
}
DayExcursion.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

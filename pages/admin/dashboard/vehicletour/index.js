import React, { useEffect } from "react";
import {
  useDeleteVehicleTourDataMutation,
  useGetVehicleTourDataQuery,
} from "@/services/adminInteraction";
import Button from "react-bootstrap/Button";
import { Table } from "react-bootstrap";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const VehicleTour = () => {
  const router = useRouter;
  const { data, isLoading } = useGetVehicleTourDataQuery();
  const [deleteVehicleTourData, { isSuccess, isError }] =
    useDeleteVehicleTourDataMutation();
  const handleDeleteClick = (id) => {
    deleteVehicleTourData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted successfully");
    }
    if (isError) {
      toast.error(isError);
    }
  }, [ isError, isSuccess]);
  return (
    <div>
      <Toaster />
      <h2>All VehicleTour Data</h2>

      <Table responsive striped="columns">
        <thead>
          <tr>
            <th>Id</th>
            <th>VehicleTour Name</th>
            <th>Country</th>
            <th>Price</th>
            <th>Discount</th>
            <th> TotalTIme</th>
            <th style={{ minWidth: "30rem" }}>Comprehensive Guide</th>
            <th style={{ minWidth: "30rem" }}>Overview</th>
            <th style={{ minWidth: "30rem" }}>First Aid Kit</th>
            <th style={{ minWidth: "30rem" }}>Itinerary</th>
            <th style={{ minWidth: "30rem" }}>Highlights</th>

            <th style={{ minWidth: "30rem" }}>ExperienceRequired </th>
            <th style={{ minWidth: "30rem" }}>Best Time To Travel</th>
            <th style={{ minWidth: "30rem" }}>Equipment and packaging list </th>
            <th style={{ minWidth: "30rem" }}>Visa And Entry Procedure</th>
            <th style={{ minWidth: "30rem" }}>Our Guides</th>

            <th style={{ minWidth: "30rem" }}>PriceIncluded</th>
            <th style={{ minWidth: "30rem" }}>PriceExcluded</th>
            <th style={{ minWidth: "30rem" }}>UsefulInfo</th>
            <th>Map</th>
            <th style={{ minWidth: "30rem" }}>Tour Images</th>
            <th style={{ minWidth: "30rem" }}>Home Carousel Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.allVehicleTour?.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.country}</td>
                <td>{data.price}</td>
                <td>{data.discount}</td>
                <td>{data.totalTime}</td>
                <td>{data.comprehensiveGuide}</td>
                <td>{data.overview}</td>

                <td>
                  {data?.firstAidKit.map((item) => {
                    return (
                      <ul key={item.firstAidKitItem}>
                        <li>{item.firstAidKitItem}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>
                  {data?.itinerary.map((item) => {
                    return (
                      <div key={item.title}>
                        <p>Title:{item.title}</p>
                        <p>Description:{item.description}</p>
                      </div>
                    );
                  })}
                </td>
                <td>
                  {data?.highlights.map((item) => {
                    return (
                      <ul key={item.highlightsTitle}>
                        <li>{item.highlightsTitle}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>{data.experienceRequired}</td>
                <td>{data.bestTimeToTravel}</td>
                <td>
                  {data?.equipment?.map((item) => {
                    return (
                      <ul key={item.equipmentItem}>
                        <li>{item.equipmentItem}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>{data?.visaAndEntryProcedure}</td>
                <td>
                  {data?.ourGuides?.map((item) => {
                    return (
                      <ul key={item.guidesTitle}>
                        <li>{item.guidesTitle}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>
                  {data.priceIncluded.map((item) => {
                    return (
                      <ul key={item.priceIncludedItem}>
                        <li>{item.priceIncludedItem}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>
                  {data.priceExcluded.map((item) => {
                    return (
                      <ul key={item.priceExcludedItem}>
                        <li>{item.priceExcludedItem}</li>
                      </ul>
                    );
                  })}
                </td>
                <td>
                  {data.usefulInfo.map((item) => {
                    return (
                      <div key={item.usefulInfoTitle}>
                        <p>title:{item.usefulInfoTitle}</p>
                        <p>description:{item.usefulInfoDescription}</p>
                      </div>
                    );
                  })}
                </td>
                <td>
                  <img
                    alt="map"
                    src={data.map}
                    style={{
                      height: "100px",
                      width: "100px",
                      backgroundSize: "cover",
                    }}
                  />
                </td>
                <td>
                  {data.tourImages.map((item) => {
                    return (
                      <img
                        key={item.tourImage}
                        src={item.tourImage}
                        alt="image"
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    );
                  })}
                </td>

                <td>
                  {data.homeImageCarousel.map((item) => {
                    return (
                      <img
                        key={item.carouselImage}
                        alt="carouselImage"
                        src={item.carouselImage}
                        style={{
                          height: "100px",
                          width: "100px",
                          backgroundSize: "cover",
                        }}
                      />
                    );
                  })}
                </td>
                <td>
                  <Link href={`/admin/dashboard/vehicletour/${data._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteClick(`${data._id}`);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default VehicleTour;
VehicleTour.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

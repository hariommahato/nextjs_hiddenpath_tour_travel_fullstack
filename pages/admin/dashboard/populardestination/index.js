import React, { useEffect } from "react";
import {
  useDeletePopularDestinationDataMutation,
  useGetPopularDestinationDataQuery,
} from "@/services/adminInteraction";
import Table from "react-bootstrap/Table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

const PopularDestination = () => {
  
  const { data } = useGetPopularDestinationDataQuery();
  const [deletePopularDestinationData, { isSuccess }] =
    useDeletePopularDestinationDataMutation();

  const handleDeleteClick = async (id) => {
    await deletePopularDestinationData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully..!!!");
    }
  }, [isSuccess, toast]);

  return (
    <div>
    <Toaster/>
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th> Image</th>

            <th colSpan={2}>Operation</th>
          </tr>
        </thead>

        <tbody>
          {data?.allPopularDestination?.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>
                  <img
                    src={data.image}
                    style={{ height: "100px", width: "100px" }}
                    alt="/"
                  />
                </td>

                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    href={`/admin/dashboard/populardestination/${data._id}`}
                  >
                    <AiFillEdit />
                    Edit
                  </Link>
                </td>
                <td style={{ color: "red" }}>
                  <Link
                    style={{ textDecoration: "none", color: "red" }}
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteClick(`${data._id}`);
                    }}
                  >
                    <AiFillDelete />
                    Delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default PopularDestination;
PopularDestination.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

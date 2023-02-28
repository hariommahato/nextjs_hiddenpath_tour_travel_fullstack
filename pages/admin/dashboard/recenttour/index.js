"use client";
import React, { useEffect } from "react";
import {
  useDeleteRecentTourDataMutation,
  useGetRecentTourDataQuery,
} from "@/services/adminInteraction";

import Table from "react-bootstrap/Table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";
const RecentTour = () => {
  const { data } = useGetRecentTourDataQuery();
  const [deleteRecentTourData, { isSuccess }] =
    useDeleteRecentTourDataMutation();
  const handleDeleteClick = async (id) => {
    await deleteRecentTourData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully...");
    }
  }, [isSuccess, toast]);
  return (
    <div>
    <Toaster/>
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th> description</th>
            <th>Image</th>

            <th colSpan={2}>Operation</th>
          </tr>
        </thead>

        <tbody>
          {data?.allRecentTour?.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>
                  <img
                    src={data.image}
                    alt="/"
                    style={{ height: "100px", width: "100px" }}
                  />
                </td>

                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    href={`/admin/dashboard/recenttour/${data._id}`}
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

export default RecentTour;
RecentTour.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

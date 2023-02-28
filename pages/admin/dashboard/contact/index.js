import React, { useEffect } from "react";
import {
  useDeleteContactUsDataMutation,
  useGetContactUsDataQuery,
} from "@/services/adminInteraction";
import Table from "react-bootstrap/Table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { toast, Toaster } from "react-hot-toast";
const Contact = () => {
  const { data } = useGetContactUsDataQuery();
  const [deleteContactUsData, { isSuccess }] = useDeleteContactUsDataMutation();
  const handleDeleteClick = async (id) => {
    await deleteContactUsData(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Successfully");
    }
  }, [isSuccess,toast]);

  return (
    <div>
      <Toaster />
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Email</th>
            <th> Name</th>
            <th>Username</th>
            <th> PackageName</th>
            <th>PhoneNumber</th>
            <th colSpan={2}>Operation</th>
          </tr>
        </thead>

        <tbody>
          {data?.allContact?.map((data) => {
            return (
              <tr key={data._id}>
                <td>{data._id}</td>
                <td>{data.email}</td>
                <td>{data.name}</td>
                <td>{data.message}</td>
                <td>{data.packageName}</td>
                <td>{data.phoneNumber}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    href={`/admin/dashboard/contact/${data._id}`}
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

export default Contact;
Contact.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

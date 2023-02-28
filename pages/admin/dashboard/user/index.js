import React, { useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/services/adminInteraction";

import Table from "react-bootstrap/Table";
import { useRouter } from "next/navigation";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
import { Toaster, toast } from "react-hot-toast";

const User = () => {
  const { data } = useGetAllUserQuery();
  const [deleteUser, { isSuccess }] = useDeleteUserMutation();
  const handleDeleteClick = async (id) => {
    await deleteUser(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Deleted Succesfully");
    }
  }, [isSuccess]);

  return (
    <div>
      <Toaster />
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>Email</th>
            <th>Password</th>

            <th colSpan={2}>Operation</th>
          </tr>
        </thead>
        {data?.allUser?.map((data) => {
          return (
            <tbody key={data._id}>
              <tr>
                <td>{data._id}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>

                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    href={`/admin/dashboard/user/${data._id}`}
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
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default User;

User.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar />
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};

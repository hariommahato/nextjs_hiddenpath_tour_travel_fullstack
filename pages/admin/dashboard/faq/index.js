
import React, { useEffect } from "react";
import {
  useDeleteFaqDataMutation,
  useGetFaqDataQuery,
} from "@/services/adminInteraction";
import Table from "react-bootstrap/Table";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const Faq = () => {
  const { data } = useGetFaqDataQuery();
  const [deleteFaqData, { isSuccess }] = useDeleteFaqDataMutation();
  const handleDeleteClick = (id) => {
    deleteFaqData(id);
  };
  useEffect(() => {
    if (isSuccess) {
      return alert("Deleted Sucessfully");
    }
  }, [isSuccess]);

  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>id</th>
            <th>Question</th>
            <th> Answer</th>

            <th colSpan={2}>Operation</th>
          </tr>
        </thead>
       
            <tbody>
            {data?.allFaq?.map((data) => {
          return (
              <tr  key={data._id}>
                <td>{data._id}</td>
                <td>{data.question}</td>
                <td>{data.answer}</td>

                <td>
                  <Link
                    style={{ textDecoration: "none", color: "green" }}
                    href={`/admin/dashboard/faq/${data._id}`}
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

export default Faq;
Faq.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar/>
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};


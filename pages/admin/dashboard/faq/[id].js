import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useGetFaqDataByIdQuery,
  useUpdateFaqDataMutation,
} from "@/services/adminInteraction";
import { useRouter } from "next/router";
import { Providers } from "@/services/provider";
import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { SessionProvider } from "next-auth/react";
const initialState = {
  question: "",
  answer: "",
};
export default function Faq() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetFaqDataByIdQuery(id);
  const [updateFaqData, { isSuccess }] = useUpdateFaqDataMutation();
  const [faqData, setFaqData] = useState(initialState);
  const { question, answer } = faqData;

  useEffect(() => {
    setFaqData({
      question: data?.faq.question,
      answer: data?.faq.answer,
    });
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFaqData({ id, faqData });
  };
  if (isSuccess) {
    router.push("/admin/dashboard/faq");
  }
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  return (
    <>
      <Form>
        <h3>Update Contact Data</h3>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            name="question"
            value={question}
            onChange={onInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            type="text"
            name="answer"
            value={answer}
            onChange={onInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          update
        </Button>
      </Form>
    </>
  );
}
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
  
  
import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { createFaq,getAllFaq} from "../../../controllers/faq";

const handler = nextConnect();
dbConnect();
handler.post(createFaq).get(getAllFaq);
export const config = {
  api: {
    responseLimit: false,
   
  },
};

export default handler;

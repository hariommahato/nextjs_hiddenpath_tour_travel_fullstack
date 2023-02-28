import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getTrekFromIndia } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getTrekFromIndia);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

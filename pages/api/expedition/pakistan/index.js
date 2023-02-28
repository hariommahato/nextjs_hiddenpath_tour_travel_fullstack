import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getExpeditionFromPakistan } from "../../../../controllers/expedition";

const handler = nextConnect();
dbConnect();
handler.get(getExpeditionFromPakistan);

export const config = {
  api: {
    responseLimit: false,
   
  },

};
export default handler;

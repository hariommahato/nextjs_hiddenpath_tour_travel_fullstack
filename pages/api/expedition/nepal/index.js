import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getExpeditionFromNepal } from "../../../../controllers/expedition";

const handler = nextConnect();
dbConnect();
handler.get(getExpeditionFromNepal);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

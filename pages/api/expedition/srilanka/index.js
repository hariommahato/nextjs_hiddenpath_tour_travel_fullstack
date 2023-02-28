import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getExpeditionFromSrilanka } from "../../../../controllers/expedition";

const handler = nextConnect();
dbConnect();
handler.get(getExpeditionFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
  
  },

};
export default handler;

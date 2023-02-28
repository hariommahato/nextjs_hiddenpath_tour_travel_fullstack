import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getExpeditionFromBhutan } from "../../../../controllers/expedition";

const handler = nextConnect();
dbConnect();
handler.get(getExpeditionFromBhutan);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

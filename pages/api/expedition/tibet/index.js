import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getExpeditionFromTibet } from "../../../../controllers/expedition";

const handler = nextConnect();
dbConnect();
handler.get(getExpeditionFromTibet);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

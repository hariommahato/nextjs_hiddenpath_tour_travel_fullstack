import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromIndia } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromIndia);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

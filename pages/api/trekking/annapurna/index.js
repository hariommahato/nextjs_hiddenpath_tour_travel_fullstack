import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getAnnapurnaZoneTrek } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getAnnapurnaZoneTrek);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getManasluZoneTrek } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getManasluZoneTrek);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

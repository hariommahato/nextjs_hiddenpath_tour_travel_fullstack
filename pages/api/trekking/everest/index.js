import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getEverestZoneTrek } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getEverestZoneTrek);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

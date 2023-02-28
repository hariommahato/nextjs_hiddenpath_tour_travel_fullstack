import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getLangtangZoneTrek } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getLangtangZoneTrek);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

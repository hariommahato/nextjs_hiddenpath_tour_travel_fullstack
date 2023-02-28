import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getOffBeatenTrek } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getOffBeatenTrek);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

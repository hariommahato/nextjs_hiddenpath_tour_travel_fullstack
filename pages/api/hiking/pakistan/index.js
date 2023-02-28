import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromPakistan } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromPakistan);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

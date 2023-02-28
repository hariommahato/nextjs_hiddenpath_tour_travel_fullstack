import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromNepal } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromNepal);

export const config = {
  api: {
    responseLimit: false,
  
  },
};
export default handler;

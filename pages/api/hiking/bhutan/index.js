import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromBhutan } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromBhutan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

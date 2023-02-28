import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getTrekFromBhutan } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getTrekFromBhutan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

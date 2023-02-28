import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromTibet } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromTibet);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

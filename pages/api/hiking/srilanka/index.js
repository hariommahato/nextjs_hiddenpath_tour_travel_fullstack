import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getHikingFromSrilanka } from "../../../../controllers/hiking";

const handler = nextConnect();
dbConnect();
handler.get(getHikingFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

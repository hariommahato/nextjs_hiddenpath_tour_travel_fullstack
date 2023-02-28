import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromSrilanka } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromPakistan } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromPakistan);

export const config = {
  api: {
    responseLimit: false,
  
  },
};
export default handler;

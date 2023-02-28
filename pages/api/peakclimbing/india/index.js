import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromIndia } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromIndia);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

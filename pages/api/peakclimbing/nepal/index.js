import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromNepal } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromNepal);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;

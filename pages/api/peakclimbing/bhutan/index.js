import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromBhutan } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromBhutan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

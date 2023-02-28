import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getPeakClimbingFromTibet } from "../../../../controllers/peakclimbing";

const handler = nextConnect();
dbConnect();
handler.get(getPeakClimbingFromTibet);

export const config = {
  api: {
    responseLimit: false,
  },
};
export default handler;

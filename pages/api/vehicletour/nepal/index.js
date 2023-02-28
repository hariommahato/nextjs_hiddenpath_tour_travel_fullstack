import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getVehicleTourFromNepal } from "../../../../controllers/vehicletour";

const handler = nextConnect();
dbConnect();
handler.get(getVehicleTourFromNepal);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

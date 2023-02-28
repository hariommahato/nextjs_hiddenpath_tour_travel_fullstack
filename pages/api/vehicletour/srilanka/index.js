import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getVehicleTourFromSrilanka } from "../../../../controllers/vehicletour";

const handler = nextConnect();
dbConnect();
handler.get(getVehicleTourFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;

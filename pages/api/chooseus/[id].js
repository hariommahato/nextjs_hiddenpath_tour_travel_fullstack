import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect.js";
import {
  updateChooseUs,
  deleteChooseUs,
  getChooseUs,
} from "../../../controllers/chooseus.js";

const handler = nextConnect();

dbConnect();
handler.get(getChooseUs).put(updateChooseUs).delete(deleteChooseUs);
export const config = {
  api: {
    responseLimit:false,
}
};
export default handler;

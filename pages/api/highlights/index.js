import nextConnect from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import {createHighlights,getAllHighlights} from '../../../controllers/highlights'

const handler = nextConnect();
dbConnect();
handler
    .post(createHighlights)
    .get(getAllHighlights);

    export const config = {
        api: {
          responseLimit:false,
          
      }
      };

export default handler;
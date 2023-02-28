import nextConnect from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import {createTestimonial,getAllTestimonial} from '../../../controllers/testimonial'


const handler = nextConnect();
dbConnect();
handler
    .post(createTestimonial)
    .get(getAllTestimonial);

    export const config = {
        api: {
          responseLimit:false,
      }
      };
export default handler;
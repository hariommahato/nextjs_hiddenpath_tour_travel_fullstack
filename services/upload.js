import axios from 'axios'
export async function uploadImage(data) {
    try {
        const response = await axios.post(process.env.NEXT_UPLOAD_URL, data)
        return {
            error: false,
            data: response
        }
    } catch (err) {
        return {
            error: true,
            data: err
        }
    }
}
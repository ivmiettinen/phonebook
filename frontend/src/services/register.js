import axios from 'axios'

const userUrl = 'api/register'

const register = async (newObject) => {
    const response = await axios.post(userUrl, newObject)
    return response.data
}

export default { register }

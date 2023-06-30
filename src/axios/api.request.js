import axios from "axios";

const baseUrl = process.env.NODE_ENV === 'development' ? 'https://0dab4f27-6784-46f3-82bf-60d903da9dcb.mock.pstmn.io' : 'http://106.14.27.210:8001'

const HttpRequest = axios.create({
    baseURL: baseUrl,  // api的base_url
    timeout: 5000  // 请求超时时间
});

export default HttpRequest;

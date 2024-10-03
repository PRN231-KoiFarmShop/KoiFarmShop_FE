import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL: baseURL,
    });
  }

  get(url, config = {}) {
    return this.api.get(url, config);
  }

  post(url, data, config = {}) {
    return this.api.post(url, data, config);
  }

  put(url, data, config = {}) {
    return this.api.put(url, data, config);
  }

  delete(url, config = {}) {
    return this.api.delete(url, config);
  }
}

export default new ApiService('http://localhost:5000/api/');

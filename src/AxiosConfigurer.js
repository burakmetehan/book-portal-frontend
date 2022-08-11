import axios from "axios";

const AxiosConfigurer = (function () {
  const _configure = () => {
    // Add a request interceptor
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('Authorization');
        if (token) {
          config.headers["Authorization"] = token;
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  };

  return {
    configure: _configure
  };
})();

export default AxiosConfigurer;

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers["Content-Type"] = "multipart/form-data";
axios.defaults.transformRequest = (data, headers) => {
  const contentType = headers["Content-Type"];
  if (contentType === "application/x-www-form-urlencoded") {
    return Qs.stringify(data);
  } else {
    return data;
  }
};
axios.interceptors.response.use(
  (res) => {
    console.log('success')
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

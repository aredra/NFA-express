const getResponse = () => {
  return {
    successResponse(res, msg) {
      const data = {
        status: 1,
        message: msg,
      };
      return res.status(200).json(data);
    },

    successResponseWithData(res, msg, data) {
      const resData = {
        status: 1,
        message: msg,
        data: data,
      };
      return res.status(200).json(resData);
    },
    ErrorResponse(res, msg) {
      const data = {
        status: 0,
        message: msg,
      };
      return res.status(500).json(data);
    },
    notFoundResponse(res, msg) {
      const data = {
        status: 0,
        message: msg,
      };
      return res.status(404).json(data);
    },
    validationErrorWithData(res, msg, data) {
      const resData = {
        status: 0,
        message: msg,
        data: data,
      };
      return res.status(400).json(resData);
    },
    unauthorizedResponse(res, msg) {
      const data = {
        status: 0,
        message: msg,
      };
      return res.status(401).json(data);
    },
  };
};
export default getResponse;

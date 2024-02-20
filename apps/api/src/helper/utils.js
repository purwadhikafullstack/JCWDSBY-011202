module.exports = {
  templateResponseError: (rc, succes, message, error, result) => {
    return {
      rc,
      succes,
      message,
      error,
      result,
    };
  },
};

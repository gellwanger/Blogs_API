module.exports = (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(400).json({ message: err.details[0].message });
  }

  if (err.status) {
    console.log('erro com status');
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).send({ message: `Internal Server Error: ${err.message}` });
};

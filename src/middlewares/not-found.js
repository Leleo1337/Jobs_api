function notFoundMiddleware(req, res) {
   res.status(404).send('<h1>Route not found! click <a href="/">Here</a> to go back </h1>');
}

export default notFoundMiddleware;

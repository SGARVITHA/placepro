export function logRequest(req, res, next) {
  const { method, originalUrl, url } = req;
  const path = originalUrl || url;
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${method} ${path} ${res.statusCode} - ${duration}ms`);
  });

  next();
}

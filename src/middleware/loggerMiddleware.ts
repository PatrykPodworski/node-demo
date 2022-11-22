const loggerMiddleware = (req: any, _res: any, next: () => void) => {
  console.log(
    req.headers.origin,
    req.method,
    req.path,
    new Date().toLocaleTimeString()
  );
  next();
};

export default loggerMiddleware;

export function loggingmd(req, res, next) {
    console.log(`${req.method} - ${req.url}`);
    next();
}

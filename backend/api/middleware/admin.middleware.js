import { adminSessions } from "../controller/admin.controller.js";

export function requireAdmin(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";

  if (!token || !adminSessions.has(token)) {
    return res.status(401).json({ message: "Admin authentication required" });
  }

  return next();
}

import jsonwebtoken from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(403).json({ message: "Access Denied", success: false });

  const jwtSecretKey = process.env.JWTKEY.toString();
  jsonwebtoken.verify(token, jwtSecretKey, (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

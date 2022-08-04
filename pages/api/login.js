import User from "./mongo";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: `Wrong credentials` });
  }
  const passwordCheck = await bcrypt.compare(body.password, user.password);

  if (passwordCheck) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      "lupiya",
      { expiresIn: "24h" }
    );
    return res
      .status(200)
      .json({ success: true, message: `Successful login`, token });
  }

  res.status(400).json({ success: false, message: `Wrong credentials` });
}

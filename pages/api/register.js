import User from "./mongo";
const bcrypt = require("bcrypt");

export default async function handler(req, res) {
  const body = JSON.parse(req.body);

  const newPass = bcrypt.hashSync(body.password, 10);

  const newUser = new User({
    name: body.name,
    email: body.email,
    gender: body.gender,
    password: newPass,
  });

  const duplicate = await User.findOne({ email: body.email });
  if (duplicate) {
    return res.status(400).json({ failed: "email already exists" });
  }
  const user = await newUser.save();
  return res
    .status(200)
    .json({ success: `User: ${body.name} has been saved`, user });
}

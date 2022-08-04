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
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  }
  const user = await newUser.save();

  if (user) {
    return res.status(200).json({
      success: true,
      message: `User: ${body.name} has been saved`,
      user,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: `Failed to save user`,
      user,
    });
  }
}

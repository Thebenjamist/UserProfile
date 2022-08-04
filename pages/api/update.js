import User from "./mongo";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const user = await User.updateOne(
    { _id: body.id },
    { name: body.name, gender: body.gender }
  )
    .then((re) => {
      return res
        .status(200)
        .json({ success: true, message: "Updated Profile" });
    })
    .catch((e) => {
      return res
        .status(400)
        .json({ success: false, message: `Failed to update ` });
    });
}

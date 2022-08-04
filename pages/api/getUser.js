import User from "./mongo";
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const user = await User.findById(body).exec();
  res.status(200).json({ success: `User: has been saved`, user });
}

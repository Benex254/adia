const mongoose = require("mongoose");

async function sortUsers(User, users, field, order = 1) {
  if (!User.schema.path(field)) {
    throw new Error(`Invalid field: ${field}`);
  }

  if (![1, -1].includes(order)) {
    throw new Error(
      `Invalid order: ${order}. Use 1 for ascending and -1 for descending`
    );
  }

  const userIds = users.map((user) => mongoose.Types.ObjectId(user._id));

  if (User.schema.path(field).instance === 'Array') {
    const sortedUsers = await User.aggregate([
      { $match: { _id: { $in: userIds } } },
      { $addFields: { [`${field}_count`]: { $size: `$${field}` } } },
      { $sort: { [`${field}_count`]: order } },
      { $project: { [`${field}_count`]: 1 } },
    ]);

    return sortedUsers;
  }

  const sortedUsers = await User.find({ _id: { $in: userIds } })
    .sort({ [field]: order });

  return sortedUsers;
}
//generate user data (name,email,password)

module.exports = sortUsers;

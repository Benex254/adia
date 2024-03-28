// Importing mongoose module
const mongoose = require("mongoose");

// Compile model from schema

// Create an instance of model
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      lower: true,
    },
    gender: {
      type: String,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      validate: {
        validator: (fullName) => fullName.split(" ").length >= 2,
        message: (props) =>
          `🤨 ${props.value} is not a full name.Should consist of first name + last name 😉`,
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email) => {
          const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          return emailRegex.test(email);
        },
        message: (props) => `🤨 ${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    interests: {
      type: [String],
      required: true,
      minLength: 3,
    },
    following: [{ type: mongoose.Schema.Types.ObjectID, ref: "user" }],
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectID, ref: "blogModel" }],
    socialLinks: {
      facebook: String,
      twitterX: String,
      instagram: String,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "user",
      },
    ],
    DOB: {
      type: Date,
      required: true,
      validate: {
        validator: (dob) => {
          let date2 = new Date(dob);

          let differenceInTime = new Date().getTime() - date2.getTime();

          let differenceInYears =
            differenceInTime / (1000 * 3600 * 24 * 365.25);
          return differenceInYears > 6;
        },
        message: (props) => `${dob} to young`,
      },
    },
    blogs: [{ type: mongoose.Schema.Types.ObjectID, ref: "blogModel" }],
    liked: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "blogModel",
      },
    ],
    followers: [{ type: mongoose.Schema.Types.ObjectID, ref: "user" }],
    avatar: String,
    bio: String,
  },
  { timestamps: { updatedAt: true } }
);

const User = mongoose.model("user", userSchema);
// async function makeFriends() {
//   const users = await User.find();
//   users.forEach(async (user, i, users) => {
//     if (Math.round(Math.random()) || Math.round(Math.random())) {
//       const followers = users
//         .filter(
//           (follower, i) =>
//             user._id !== follower._id &&
//             Math.round(
//               Math.random() &&
//                 i % 4 === 0 &&
//                 i % 3 === 0 &&
//                 Math.round(Math.random() && Math.round(Math.random()))
//             )
//         )
//         .map((follower) => {
//           return String(follower._id);
//         });
//       console.log(followers);
//       followers.forEach(async (follower, i, followers) => {
//         await User.findByIdAndUpdate(
//           follower._id,
//           { $push: { following: String(user._id) } },
//           { new: true }
//         );
//       });
//       await User.findByIdAndUpdate(user._id, {
//         $push: { followers: { $each: followers } },
//       });
//     }
//   });
//   console.log("done");
// }

// makeFriends().then();
module.exports = User;

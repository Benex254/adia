// Importing mongoose module
const mongoose = require("mongoose");

// Compile model from schema

// Create an instance of model
const adminSchema = new mongoose.Schema(
  {
    adminName: {
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
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    socialLinks: {
      facebook: String,
      twitterX: String,
      instagram: String,
      phoneNumber: String,
    },
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
    avatar: String,
    bio: String,
  },
  { timestamps: { updatedAt: true } }
);

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
// async function makeFriends() {
//   const admins = await admin.find();
//   admins.forEach(async (admin, i, admins) => {
//     if (Math.round(Math.random()) || Math.round(Math.random())) {
//       const followers = admins
//         .filter(
//           (follower, i) =>
//             admin._id !== follower._id &&
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
//         await admin.findByIdAndUpdate(
//           follower._id,
//           { $push: { following: String(admin._id) } },
//           { new: true }
//         );
//       });
//       await admin.findByIdAndUpdate(admin._id, {
//         $push: { followers: { $each: followers } },
//       });
//     }
//   });
//   console.log("done");
// }

// makeFriends().then();

// Importing mongoose module
const mongoose = require("mongoose");

//  content schema
const commentSchema = new mongoose.Schema({
  blogID: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  subComments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment"}],
  content: {
    type: String,
    required: true,
  },
  thumbsUp:{
    type:Number,
    default:0,
  },
  thumbsDown:{
    type:Number,
    default:0,
  },
  createdAt:{
    type:Date,
    default: ()=> new Date()
  },
},{timeStamp:{updatedAt:true}});


// Create an instance of model
// Compile models from schema
const comment = mongoose.model("comment", commentSchema);

module.exports = {comment}
// async function makeFriends() {
//   const blogs = await blog.find();
//   blogs.forEach(async (blog, i, blogs) => {
//     if (Math.round(Math.random()) || Math.round(Math.random())) {
//       const followers = blogs
//         .filter(
//           (follower, i) =>
//             blog._id !== follower._id &&
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
//         await blog.findByIdAndUpdate(
//           follower._id,
//           { $push: { following: String(blog._id) } },
//           { new: true }
//         );
//       });
//       await blog.findByIdAndUpdate(blog._id, {
//         $push: { followers: { $each: followers } },
//       });
//     }
//   });
//   console.log("done");
// }

// makeFriends().then();

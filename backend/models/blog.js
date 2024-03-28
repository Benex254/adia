// Importing mongoose module
const mongoose = require("mongoose");

//  content schema
const contentSchema = new mongoose.Schema({
  blogID: { type: mongoose.Schema.Types.ObjectId, ref: "blog", required: true },
  richText: {
    type: String,
    required: true,
  },
});


// Create an instance of model
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    blogger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    synopsis: {
      image: String,
      text: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      required: true,
      minLength: 3,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectID, ref: "comment" }],
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "content",
      required: true,
    },
  },
  { timestamps: { updatedAt: true } }
);

// Compile models from schema
const content = mongoose.model("content", contentSchema);
const blog = mongoose.model("blog", blogSchema);

module.exports = {blog,content}
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

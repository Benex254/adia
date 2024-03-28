const express = require("express");
const User = require("../models/user.js");
const sortUsers = require("../utils/sorts.js");

const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    if (req.query.sort) {
      try {
        const users = await User.find();
        const [field, orderStr] = req.query.sort.split("_");
        if (!["asc", "desc"].includes(orderStr))
          return res.json({
            "Invalid order": ` ${orderStr}, Use fieldName_asc for ascending and fieldName_desc for descending 😉`,
          });
        const order = orderStr === "asc" ? 1 : -1;
        const sortedUsers = await sortUsers(User, users, field, order);
        res.json(sortedUsers);
      } catch (err) {
        res.status(400).json({ "OOPS 😬": `${err.message}` });
      }
    } else {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(400).json({ "OOPS 😬": `${err.message}` });
      }
    }
  })
  .post(async (req, res) => {
    const newUser = new User(req.body);
    try {
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json(err.message);
    }
  });

// get user by param [userName, email, id]

// by userName
router.get("/getByUserName/:userName", async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.userName });
    if (!user) return res.status(404).json({ message: "😬 user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ "ERROR😬": `${err.message}` });
  }
});

//  by email
router.get("/getByEmail/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "😬 user not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ "ERROR😬": `${err.message}` });
  }
});

router
  .route("/:id")
  // get user by id
  .get(async (req, res) => {
    const toPopulate = [];
    try {
      // what to populate
      if (req.query.interests) toPopulate.push("interests");
      if (req.query.following) toPopulate.push("following");
      if (req.query.bookmarks) toPopulate.push("bookmarks");
      if (req.query.friends) toPopulate.push("friends");
      if (req.query.liked) toPopulate.push("liked");
      if (req.query.followers) toPopulate.push("followers");
      if (req.query.blogs) toPopulate.push("blogs");

      const user = toPopulate.length
        ? await User.findById(req.params.id).populate(toPopulate)
        : await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ undefined: `🫤 user, ${req.params.id} does not exist` });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ "ERROR😬": `${err.message}` });
    }
  })
  // Delete a user
  .delete(async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "😬 user not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ "ERROR😬": `${err.message}` });
    }
  })
  //update a user
  .put(async (req, res) => {
    try {
      const update = { ...req.body };

      //TODO:validate that the entry does not already exist or  is refencing self😅

      // updating (adding) those that are arrays
      if (update.friends) {
        update.$push = { friends: { $each: update.friends } };
        delete update.friends;
      }
      if (update.interests) {
        update.$push = { ...{ interests: { $each: update.interests } } };
        delete update.interests;
      }
      if (update.following) {
        update.$push = { ...{ following: { $each: update.following } } };
        delete update.following;
      }
      if (update.bookmarks) {
        update.$push = { ...{ bookmarks: { $each: update.bookmarks } } };
        delete update.bookmarks;
      }
      if (update.followers) {
        update.$push = { ...{ followers: { $each: update.followers } } };
        delete update.followers;
      }
      if (update.blogs) {
        update.$push = { ...{ blogs: { $each: update.blogs } } };
        delete update.blogs;
      }
      if (update.liked) {
        update.$push = { ...{ liked: { $each: update.liked } } };
        delete update.liked;
      }

      //updating (removing) those that are arrays
      if (update.remove_friends) {
        update.$pullAll = { friends: update.remove_friends };
        delete update.remove_friends;
      }
      if (update.remove_interests) {
        update.$pullAll = { ...{ interests: update.remove_interests } };
        delete update.remove_interests;
      }
      if (update.remove_following) {
        update.$pullAll = { ...{ following: update.remove_following } };
        delete update.remove_following;
      }
      if (update.remove_bookmarks) {
        update.$pullAll = { ...{ bookmarks: update.remove_bookmarks } };
        delete update.remove_bookmarks;
      }
      if (update.remove_followers) {
        update.$pullAll = { ...{ followers: update.remove_followers } };
        delete update.remove_followers;
      }
      if (update.remove_blogs) {
        update.$pullAll = { ...{ blogs: update.remove_blogs } };
        delete update.remove_blogs;
      }
      if (update.remove_liked) {
        update.$pullAll = { ...{ liked: update.remove_liked } };
        delete update.remove_liked;
      }
      const user = await User.findByIdAndUpdate(req.params.id, update, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        return res.status(404).json({ message: "😬 user not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ "ERROR😬": `${err.message}` });
    }
  });

// more precise functionality

// get specific field of user that refs another
router.get("/:id/:field", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ undefined: `🫤 user, ${req.params.id} does not exist` });
    }
    // TODO:change it to only use one user
    switch (req.params.field) {
      case "friends":
        try {
          const usersFriends = await User.findById(req.params.id).populate(
            "friends"
          );
          if (req.query.sort) {
            try {
              const [field, orderStr] = req.query.sort.split("_");
              if (!["asc", "desc"].includes(orderStr))
                return res.json({
                  "Invalid order": ` ${orderStr}, Use fieldName_asc for ascending and fieldName_desc for descending 😉`,
                });
              const order = orderStr === "asc" ? 1 : -1;
              const sortedUsers = await sortUsers(
                User,
                usersFriends.friends,
                field,
                order
              );
              res.json(sortedUsers);
            } catch (err) {
              res.status(500).json({ "OOPS 😬": `${err.message}` });
            }
          } else {
            res.json(usersFriends.friends);
          }
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      case "following":
        try {
          const usersFollowing = await User.findById(req.params.id).populate(
            "following"
          );
          if (req.query.sort) {
            try {
              const [field, orderStr] = req.query.sort.split("_");
              if (!["asc", "desc"].includes(orderStr))
                return res.json({
                  "Invalid order": ` ${orderStr}, Use fieldName_asc for ascending and fieldName_desc for descending 😉`,
                });
              const order = orderStr === "asc" ? 1 : -1;
              const sortedUsers = await sortUsers(
                User,
                usersFollowing.following,
                field,
                order
              );
              res.json(sortedUsers);
            } catch (err) {
              res.status(400).json({ "OOPS 😬": `${err.message}` });
            }
          } else {
            res.json(usersFollowing.friends);
          }
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      case "followers":
        try {
          const usersFollowers = await User.findById(req.params.id).populate(
            "followers"
          );
          if (req.query.sort) {
            try {
              const [field, orderStr] = req.query.sort.split("_");
              if (!["asc", "desc"].includes(orderStr))
                return res.json({
                  "Invalid order": ` ${orderStr}, Use fieldName_asc for ascending and fieldName_desc for descending 😉`,
                });
              const order = orderStr === "asc" ? 1 : -1;
              const sortedUsers = await sortUsers(
                User,
                usersFollowers.followers,
                field,
                order
              );
              res.json(sortedUsers);
            } catch (err) {
              res.status(400).json({ "OOPS 😬": `${err.message}` });
            }
          } else {
            res.json(usersFollowers.followers);
          }
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      case "liked":
        try {
          const usersLiked = await User.findById(req.params.id).populate(
            "liked"
          );
          if (req.query.sort) {
            try {
              const [field, orderStr] = req.query.sort.split("_");
              if (!["asc", "desc"].includes(orderStr))
                return res.json({
                  "Invalid order": ` ${orderStr}, Use fieldName_asc for ascending and fieldName_desc for descending 😉`,
                });
              const order = orderStr === "asc" ? 1 : -1;
              const sortedUsers = await sortUsers(
                User,
                usersLiked.liked,
                field,
                order
              );
              res.json(sortedUsers);
            } catch (err) {
              res.status(400).json({ "OOPS 😬": `${err.message}` });
            }
          } else {
            res.json(usersLiked.liked);
          }
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      case "bookmarks":
        try {
          const usersBookmarks = await User.findById(req.params.id).populate(
            "bookmarks"
          );
          res.json(usersBookmarks.bookmarks);
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      case "blogs":
        try {
          const usersBlogs = await User.findById(req.params.id).populate(
            "blogs"
          );
          res.json(usersBlogs.blogs);
        } catch (err) {
          res.status(500).json({ "ERROR 😬": `${err.message}` });
        }
        break;
      default:
        res.status(400).json({
          undefined: `🫤 field, ${req.params.field} does not exist or is not populatable`,
        });
    }
  } catch (err) {
    res.status(500).json({ "ERROR 😬": `${err.message}` });
  }
});
module.exports = router;

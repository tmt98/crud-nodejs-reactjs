)
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema, "post");
module.exports = Post;

import store from "../store.js";
import Post from "../Models/Post.js";

// @ts-ignore
let jackDatabase = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000
});

class PostsService {
  constructor() {
    this.getPostsAsync();
  }
  async getPostsAsync() {
    let res = await jackDatabase.get("posts");
    let posts = res.data.map(post => new Post(post));
    store.commit("posts", posts);
    // NOTE need to determine commit path
  }
  async addPostAsync(newPost) {
    let res = await jackDatabase.post("posts", newPost);
    this.getPostsAsync();
  }

  async editPostAsync(postId, change) {
    let editPost = store.State.posts.find(post => postId == post._id);
    console.log(change);

    await jackDatabase.put("posts/" + `${postId}`, change);
    this.getPostsAsync();
  }

  async upvote(postId) {
    let post = store.State.posts.find(post => postId == post._id);
    console.log("HOW MANY VOTES", post.votes++);
    let res = await jackDatabase.put("posts/" + `${postId}`, {
      votes: post.votes++
    });
    console.log("upvote after put request to database", res);
    //FIXME number of votes in store is one more than in database before and after getPostsAsync
    // TODO add timeout/button disable to prevent multiple votes from single user
    console.log("UPVOTES store before getPostsAsync", store.State.posts);
    this.getPostsAsync();
    console.log("store after getPostsAsync in upvote fn", store.State.posts);
  }

  async downvote(postId) {
    let post = store.State.posts.find(post => postId == post._id);
    // debugger;
    if (post.votes > 0) {
      let res = await jackDatabase.put("posts/" + `${postId}`, {
        votes: --post.votes
      });
      console.log("from downvote after put request", res);
      this.getPostsAsync();
    }
  }

  async deletePostAsync(postId) {
    let deletePost = store.State.posts.find(post => postId == post._id);
    await jackDatabase.delete("posts/" + `${postId}`);
    this.getPostsAsync();
  }
}

const service = new PostsService();
export default service;

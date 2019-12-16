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

    function compareVotes(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0;
        }
        const varA = a[key];
        const varB = b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
    posts.sort(compareVotes("votes", "desc"));

    store.commit("posts", posts);
    console.log("order of posts in store", store.State.posts);
    // console.log(
    //   store.State.posts.map(post => post.votes).sort((a, b) => b - a)
    // );
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
    // TODO add timeout/button disable to prevent multiple votes from single user
    this.getPostsAsync();
  }

  async downvote(postId) {
    let post = store.State.posts.find(post => postId == post._id);
    // debugger;
    if (post.votes > 0) {
      let res = await jackDatabase.put("posts/" + `${postId}`, {
        votes: --post.votes
      });
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

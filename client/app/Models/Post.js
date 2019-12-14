export default class Post {
  constructor(data) {
    this.article = data.article;
    this.username = data.username;
    this.title = data.title;
    this._id = data._id;
    this.word = data.word;
  }
  // NOTE title is the random word the user must use; may have to refactor how to populate this

  get Template() {
    return `
        <div class="media pb-3 pr-3 pl-3">
            <div class="d-flex flex-column text-center">
            <i class="fas fa-caret-up"
                title="yaaaasss" 
                onclick="app.postsController.upvote('${this._id}')">
                </i>
                <p class="m-0">##</p>
            <i class="fas fa-caret-down"
                title="um, no"
                onclick="app.postsController.downvote('${this._id}')"
                ></i>
            </div>
            <div class="media-body">
                <div class="m-0 pl-3">
                    <span>${this.title}</span>
                    <p class="text-danger m-0" id="username">${this.username}</p>
                    <p class="text-primary m-0">${this.word}</p>
                </div>
                <p class="m-0 pl-3 d-inline">
                  ${this.article}
                </p>
                  <i class="fas fa-edit pl-2" title="edit" onclick="app.postsController.editPostAsync('${this._id}')"></i>
                  <i class="fas fa-trash-alt pl-1" title="delete" onclick="app.postsController.deletePostAsync('${this._id}')"></i>
            </div>
        </div>
        `;
  }
}

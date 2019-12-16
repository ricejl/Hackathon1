export default class Giphy {
  constructor(data) {
    this.giph = data.embed_url;
  }

  get Template() {
    return `
    <iframe frameBorder="0" src="${this.giph}"></iframe
    `;
  }
}

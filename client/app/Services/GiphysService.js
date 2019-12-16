import store from "../store.js";
import Giphy from "../Models/Giphy.js";

// @ts-ignore
let _giphyAPI = axios.create({
  baseURL: "https://api.giphy.com/v1/gifs",
  timeout: 3000
});

class GiphyService {
  async connectGiphy() {
    console.log("store title of active job", store.State.activeJob.name);
    let res = await _giphyAPI.get(
      "random?api_key=bTA0RtS9RXmQa6KaxGJ8mGNP4ZWXZB5r&rating=PG-13&tag=" +
        store.State.activeJob.name
    );
    console.log("MAYBE properly tagged url", res);
    let data = new Giphy(res.data.data);
    store.commit("giphy", data);
    console.log("new Giphy instance committed to store", data);
    console.log(store.State.giphy);
  }
}
// FIXME connectGiphy being called twice--once in GiphyService (cannot yet add job tag at url end bc job has not yet populated) and once in jobsservice (adds job tag)

const service = new GiphyService();
export default service;

import store from "../store.js";
import GiphysService from "../Services/GiphysService.js";

// @ts-ignore
let jackDatabase = axios.create({
  baseURL: "http://localhost:3000/api/jobs"
});

class JobsService {
  constructor() {}
  async getJobAsync() {
    let res = await jackDatabase.get("");
    let jobs = res.data;
    //  NOTE need to determine file path
    store.commit("jobs", jobs);
    this.getActiveJobAsync();
    GiphysService.connectGiphy();
  }
  // FIXME connectGiphy being called twice--once in GiphyService (cannot yet add job tag at url end bc job has not yet populated) and once in jobsservice (adds job tag)

  async getActiveJobAsync() {
    let max = store.State.jobs.length;
    let random = store.State.jobs[Math.floor(Math.random() * max)];
    store.commit("activeJob", random);
  }
}

const service = new JobsService();
export default service;

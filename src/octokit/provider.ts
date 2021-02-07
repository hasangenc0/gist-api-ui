import { Octokit } from "@octokit/rest";

export class OctokitProvider {
  static getOctokit() {
    return new Octokit({
      auth: process.env.REACT_APP_GITHUB_PERSONAL_TOKEN,
    });
  }
}

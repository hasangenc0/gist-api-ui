import { Octokit } from "@octokit/rest";

export class OctokitProvider {
  static getOctokit() {
    return new Octokit({
      auth: "c763faacd3944369bec6ce513f7526b714baf9d3",
    });
  }
}

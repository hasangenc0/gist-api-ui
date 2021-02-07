import {Octokit} from "@octokit/rest";
import {map} from "../mappers/gist-mapper";
import {MappedGist} from "../types/mappedGist";

export class GistService {
  constructor(private octokit: Octokit) {}

  // Create gists using octokit
  async create(fileName: string, content: string): Promise<boolean> {
    try {
      const response = await this.octokit.gists.create({
        files: {
          [fileName]: {
            content,
          }
        },
        public: true
      });

      return response.status === 201;
    } catch (e) {}

    return false;
  }

  // Search public gists by github username
  async getByUser(username: string): Promise<MappedGist[] | null> {
    try {
      const response = await this.octokit.gists.listForUser({
        username,
      });

      if (response.status === 200) {
        return map(response.data as any);
      }

      return null;
    } catch (e) {}

    return null;
  }
}

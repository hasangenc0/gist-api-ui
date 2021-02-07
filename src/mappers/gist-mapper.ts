import {GistFiles, GistResponse} from "../types/gistResponse";
import {MappedGist, MappedGistFileProperties} from "../types/mappedGist";

// map gist api response to view model
export const map = (gistResult: GistResponse[]): MappedGist[] | null => {
  if (!Array.isArray(gistResult)) {
    return null;
  }

  return gistResult.map((item) => {
     return {
       ...getFileAttributes(item.files),
      createTime: new Date(item.created_at).toDateString(),
      lastUpdateTime: new Date(item.updated_at).toDateString(),
      url: item.html_url,
      comments: item.comments,
      description: item.description,
      ownerImageUrl: item.owner.avatar_url,
      userName: item.owner.login,
     };
  });
};

export const getFileAttributes = (files: GistFiles): MappedGistFileProperties => {
  const file = Object.values(files)[0];
  return {
    fileName: file.filename,
    fileSize: file.size,
  }
};

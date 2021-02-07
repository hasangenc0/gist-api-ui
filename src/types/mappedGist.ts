export interface MappedGist extends MappedGistFileProperties {
  createTime: string;
  lastUpdateTime: string;
  url: string;
  comments: number;
  description: string;
  ownerImageUrl: string;
  userName: string;
}

export interface MappedGistFileProperties {
  fileName: string;
  fileSize: number;
}

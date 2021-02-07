import * as gistMapper from './gist-mapper';
import faker from 'faker';
import {GistResponse} from "../types/gistResponse";

describe('[gist-mapper.test.ts]', () => {
  test('Map method should return MappedGist object.', () => {
    const gistResponse = [{
      html_url: faker.random.word(),
      files: {
        exampleFile : {
          filename: faker.random.word(),
          size: faker.random.word(),
        }},
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
      description: faker.random.word(),
      comments: faker.random.number(),
      owner: {
        avatar_url: faker.random.word(),
        userName: faker.random.word(),
      },
    }] as any as GistResponse[];
    const responseItem = gistResponse[0];
    const expected = [{
      fileName: responseItem.files.exampleFile.filename,
      fileSize: responseItem.files.exampleFile.size,
      createTime: new Date(responseItem.created_at).toDateString(),
      lastUpdateTime: new Date(responseItem.updated_at).toDateString(),
      url: responseItem.html_url,
      comments: responseItem.comments,
      description: responseItem.description,
      ownerImageUrl: responseItem.owner.avatar_url,
      userName: responseItem.owner.login,
    }];

    const result = gistMapper.map(gistResponse);

    expect(result).toEqual(expected);
  });

  test('Map method should return null if gist response is not valid', () => {
    const gistResponse = null as any;
    const result = gistMapper.map(gistResponse);

    expect(result).toEqual(null);
  });
});

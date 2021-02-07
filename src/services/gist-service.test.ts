import { GistService } from './gist-service';
import faker from 'faker';
import {Octokit} from "@octokit/rest";
import { createSandbox } from 'sinon';
import * as gistMapper  from '../mappers/gist-mapper';

const sandbox = createSandbox();

const octokit = {
  gists: {
    create: () => {},
    listForUser: () => {}
  }
} as Octokit;

describe('[gist-service.test.ts]', () => {
  let gistService: GistService;
  beforeEach(() => {
    sandbox.stub(octokit.gists, 'create');
    sandbox.stub(octokit.gists, 'listForUser');
    sandbox.stub(gistMapper, 'map');
    gistService = new GistService(octokit);
  });

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  test('Create method should call create method of octokit', async () => {
    const fileName = faker.random.word();
    const content = faker.random.word();
    await gistService.create(fileName, content);

    sandbox.assert.calledOnce(octokit.gists.create as any);
  });

  test('getByUser method should should call listForUser method of octokit', async () => {
    const userName = faker.random.word();
    await gistService.getByUser(userName);

    sandbox.assert.calledOnce(octokit.gists.listForUser as any);
  });
});

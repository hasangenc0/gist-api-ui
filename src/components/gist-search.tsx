import React, {useContext, useState} from 'react';
import {AppContext} from "../context/app-context";
import {Avatar, Space, Input, List, Popover, Divider} from 'antd';
import {MappedGist} from "../types/mappedGist";
import { MessageOutlined, InfoCircleOutlined } from '@ant-design/icons';
const { Search } = Input;

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const GistSearch = () => {
  const {gistService} = useContext(AppContext);
  const [items, setItems] = useState<MappedGist[]>([]);
  const searchGist = async (username: string) => {
    const result = await gistService.getByUser(username);
    return setItems(result && Array.isArray(items) ? result: []);
  };

  return (
    <div>
      <Search placeholder="Search gists by username" onSearch={searchGist} enterButton />
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
          <>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.ownerImageUrl} />}
              title={<Popover content={'Click to see gist on github'}>
                <a target="_blank" rel="noreferrer" href={item.url}>{item.fileName}</a> <InfoCircleOutlined/>
              </Popover>}
              description={`${item.description ?? ''} \n Created at: ${item.createTime} and Updated at: ${item.lastUpdateTime}`}
            />
              <IconText icon={MessageOutlined} text={item.comments} key="list-vertical-message" /> comments
          </List.Item>
          <Divider />
          </>
        )}
      />
    </div>
  );
};

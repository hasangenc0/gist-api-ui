import React from 'react';
import {Layout, Space, Typography} from 'antd';
import {GistCreator} from "./gist-creator";
import {GistSearch} from "./gist-search";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const AppLayout = () => {
    return (
      <Layout className="layout" style={{minHeight:"100vh"}}>
        <Space size="middle" direction="vertical">
          <Header>
            <Title className={'page-title'}>Gist API UI</Title>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Space className="site-layout-content" size="large" direction="vertical">
              <GistCreator/>
              <GistSearch/>
            </Space>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Hasan Genc ©{new Date().getFullYear()}</Footer>
        </Space>
    </Layout>
  );
};

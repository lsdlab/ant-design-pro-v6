import { QuestionCircleOutlined } from '@ant-design/icons';
import { SelectLang as UmiSelectLang } from '@umijs/max';
import React from 'react';
import NoticeIconView from '../NoticeIcon';


export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  return (
    <SelectLang />
  );
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};

export const Notice = () => {
  return (
    <NoticeIconView />
  );
};

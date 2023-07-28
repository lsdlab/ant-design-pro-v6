import { getUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Drawer } from 'antd';
import React, { useRef, useState } from 'react';


const UserList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.UserListItem>();

  const columns: ProColumns<API.UserListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'The user ID is the unique key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
    {
      title: '是否启用',
      dataIndex: 'is_active',
      valueEnum: {
        true: {
          text: '启用',
          status: 'Success',
        },
        false: {
          text: '停用',
          status: 'Error',
        },
      },
    },
    {
      title: '是否管理员',
      dataIndex: 'is_superuser',
      valueEnum: {
        true: {
          text: '是',
          status: 'Success',
        },
        false: {
          text: '否',
          status: 'Error',
        },
      },
    },
    {
      title: '上次登录时间',
      sorter: true,
      dataIndex: 'last_login',
      valueType: 'dateTime',
    },
    {
      title: '注册时间',
      sorter: true,
      dataIndex: 'date_joined',
      valueType: 'dateTime',
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.UserListItem, API.PageParams>
        headerTitle='用户'
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (
          params: T & {
            page_size: number;
            page: number;
          },
        ) => {
          const msg = await getUsers({
            page: params.current,
            page_size: params.pageSize,
          });
          return {
            data: msg.results,
            success: true,
            total: msg.count,
          };
        }}
        columns={columns}
      />

      <Drawer
        width={800}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.username && (
          <ProDescriptions<API.UserListItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<API.UserListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default UserList;

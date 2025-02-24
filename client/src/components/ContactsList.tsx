import React from 'react';
import { Contact } from '../types/contact';
import { Button, Space, Table, TableProps } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

interface ContactListProps {
    contacts: Contact[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onCall: (id: number) => void;
}

export default function ContactList (props: ContactListProps) {
    const { contacts, onEdit, onDelete, onCall } = props;
    const columns: TableProps['columns'] = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
              <Space size="middle">
                <Button type="text" onClick={() => onCall(record.id)}>Call</Button>
                <Button type="text" onClick={() => onEdit(record.id)}>Edit</Button>
                <Button type="text" onClick={() => onDelete(record.id)}><DeleteFilled /></Button>
              </Space>
            ),
          },
        
      ];
    
    return (
        <Table rowKey="id" dataSource={contacts} columns={columns} />
    );
};
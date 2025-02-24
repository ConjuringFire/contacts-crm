import React from 'react';
import { Contact } from '../types/contact';
import { Space, Table, TableProps } from 'antd';
import { DeleteFilled } from '@ant-design/icons';

interface ContactListProps {
    contacts: Contact[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onCall: (id: number) => void;
}

const ContactList: React.FC<ContactListProps> = (props: ContactListProps) => {
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
                <a onClick={() => onCall(record.id)}>Call</a>
                <a onClick={() => onEdit(record.id)}>Edit</a>
                <a onClick={() => onDelete(record.id)}><DeleteFilled /></a>
              </Space>
            ),
          },
        
      ];
    
    return (
        <Table dataSource={contacts} columns={columns} />
    );
};

export default ContactList;
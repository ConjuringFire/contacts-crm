import { Contact } from '../types/contact';
import { Button, Form, Input, Select } from 'antd';

interface ContactFormProps {
    onSave: (contact: Contact) => void;
    onCancel: () => void;
    initialContact?: Contact | null;
}

export default function ContactForm(props: ContactFormProps) {
    const {onCancel, onSave, initialContact} = props;
    const [form] = Form.useForm();


    const handleSubmit = (values: any) => {
        const fullPhone = `${values.areaCode}${values.phone}`;
        const updatedContact = { ...values, phone: fullPhone, id: initialContact?.id }; 
        onSave(updatedContact);
        form.resetFields();
    };

    return (
        <Form form={form} onFinish={handleSubmit} initialValues={{
            name: initialContact?.name || '',
            areaCode: initialContact?.phone ? initialContact.phone.substring(0, 3) : '+61', 
            phone: initialContact?.phone ? initialContact.phone.substring(3) : '',
            email: initialContact?.email || '',
        }}>
            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter the contact name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="Phone" required={true}>
            <Form.Item
                    name="areaCode"
                    rules={[{ required: true, message: 'Please select the area code!' }]}
                    style={{ display: 'inline-block', width: '30%' }}
                >
                    <Select placeholder="Area Code">
                        <Select.Option value="+61">AU (+61)</Select.Option>
                        <Select.Option value="+64">NZ (+64)</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Please enter the phone number!' }]}
                    style={{ display: 'inline-block', width: '70%' }}
                >
                    <Input placeholder="Phone Number" />
                </Form.Item>
            </Form.Item>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    { required: true, message: 'Please enter the contact email!' },
                    {
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ float: 'right' }}>Save</Button>
                <Button type="text" onClick={() => onCancel()} style={{ float: 'right' }}>Cancel</Button>
            </Form.Item>
        </Form>
    );
}
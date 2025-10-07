import React, { useCallback } from 'react';
import { format } from 'date-fns';
import { Button, Menu, Table } from '@mantine/core';
import { IconSettings, IconTrash, IconEdit } from '@tabler/icons-react';

import { Contact } from '@/lib/contactSchemas';

interface IProps {
  contacts: Contact[];
  handleOpenDeleteModal: (contactId: string) => void;
}

const ContactsTable: React.FC<IProps> = ({ contacts, handleOpenDeleteModal }) => {
  const rows = useCallback(() => {
    return contacts.map((contact) => (
      <Table.Tr key={contact.id}>
        <Table.Td>{contact.name}</Table.Td>
        <Table.Td>{contact.phone}</Table.Td>
        <Table.Td>{format(new Date(contact.created_at || ''), 'dd/MMMM/yyyy')}</Table.Td>
        <Table.Td>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant={'default'}>
                <IconSettings stroke={2} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconEdit size={14} />}>Edit</Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => handleOpenDeleteModal(contact.id)}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Table.Td>
      </Table.Tr>
    ));
  }, [contacts, handleOpenDeleteModal]);

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder horizontalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Phone number</Table.Th>
            <Table.Th>Created at</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows()}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default ContactsTable;

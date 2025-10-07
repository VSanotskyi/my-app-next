import { Button, Flex, Group, Modal, Title } from '@mantine/core';
import React from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const DeleteContactModal: React.FC<IProps> = ({ isOpen, onClose, onDelete, size, title }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} title={title} size={size}>
      <Flex direction="column" gap={8}>
        <Title order={3}>Are you sure you want to delete this contact?</Title>
        <Group>
          <Button variant="outline" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Delete
          </Button>
        </Group>
      </Flex>
    </Modal>
  );
};

export default DeleteContactModal;

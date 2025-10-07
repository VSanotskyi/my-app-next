import React, { useEffect } from 'react';
import { Button, InputBase, Modal, TextInput, Title } from '@mantine/core';
import { useFormik } from 'formik';
import { IMaskInput } from 'react-imask';

import { Contact, contactSchema, createContactInitialValues } from '@/lib/contactSchemas';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (values: typeof createContactInitialValues) => void;
  onUpdate: (values: typeof createContactInitialValues) => void;
  userId: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  contact: Contact | null;
}

const CreateUpdateContactModal: React.FC<IProps> = ({
  isOpen,
  onClose,
  title,
  size,
  onCreate,
  onUpdate,
  userId,
  contact,
}) => {
  const formik = useFormik({
    initialValues: { ...createContactInitialValues, user_id: userId },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      if (contact) {
        onUpdate(values);
      } else {
        onCreate(values);
      }
      onClose();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (contact) {
      formik.setValues({
        id: contact.id || '',
        name: contact.name || '',
        phone: contact.phone || '',
        user_id: contact.user_id || '',
      });
    } else {
      formik.resetForm();
    }
  }, [contact]);

  return (
    <Modal opened={isOpen} onClose={onClose} title={title} size={size}>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'start',
          gap: '12px',
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          padding: '12px',
        }}
      >
        <Title order={3}>Create new contact</Title>
        <TextInput
          label={'Name'}
          name={'name'}
          placeholder="Name"
          w={'100%'}
          withAsterisk
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name ? `${formik.errors.name}` : undefined}
          onChange={formik.handleChange}
        />
        <InputBase
          label="Phone number"
          name="phone"
          placeholder="Phone phone"
          mask="+380 (00) 000-00-00"
          w={'100%'}
          withAsterisk
          value={formik.values.phone || ''}
          error={formik.touched.phone && formik.errors.phone ? `${formik.errors.phone}` : undefined}
          onChange={formik.handleChange}
          onInput={formik.handleChange}
          component={IMaskInput}
        />
        <Button type={'submit'} variant="default" w={'50%'}>
          Submit
        </Button>
      </form>
    </Modal>
  );
};

export default CreateUpdateContactModal;

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Button, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useCheckAuth } from '@/hooks/useCheckAuth';
import { createClient } from '@/utils/supabase/component';
import { ICreateContact } from '@/lib/contactSchemas';

import Loader from '@/components/ui/loader/Loader';
import CreateContactModal from '@/components/ui/modals/CreateContactModal';
import ContactsTable from '@/components/contacts/ContactsTable';
import DeleteContactModal from '@/components/ui/modals/DeleteContactModal';

import { Contact } from '@/lib/contactSchemas';

const Page = () => {
  const { isLoading: authLoading, user } = useCheckAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(true);
  const [deleteContactIs, setDeleteContactIs] = useState('');
  const [createModalOpened, { toggle: toggleCreateModal }] = useDisclosure(false);
  const [deleteModalOpened, { toggle: toggleDeleteModal }] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleCreateNewContact = async (values: ICreateContact) => {
    try {
      const { data, error } = await supabase.from('contacts').insert([values]).select().single();
      if (error) {
        console.error('Error inserting contact:', error);
        return;
      }
      if (data) {
        setContacts((prev) => [data as Contact, ...prev]);
        toggleCreateModal();
      }
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const handleDeleteContact = async () => {
    try {
      const { error } = await supabase.from('contacts').delete().eq('id', deleteContactIs);
      if (error) {
        console.error('Error deleting contact:', error);
        return;
      }
      setContacts((prev) => prev.filter((contact) => contact.id !== deleteContactIs));
      setDeleteContactIs('');
      toggleDeleteModal();
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleOpenDeleteModal = (contactId: string) => {
    setDeleteContactIs(contactId);
    toggleDeleteModal();
  };

  const fetchUserContacts = useCallback(async () => {
    setContactsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setContactsLoading(false);
        return;
      }
      setContacts(data as Contact[]);
    } catch (err: any) {
      console.error('Error fetching user contacts:', err.message);
      setError(err.message);
    } finally {
      setContactsLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!authLoading && user) {
      void fetchUserContacts();
    } else if (!authLoading && !user) {
      setContactsLoading(false);
    }
  }, [authLoading, user, supabase, fetchUserContacts]);

  return (
    <>
      <Flex direction="column">
        <Flex justify={'space-between'}>
          <Title order={2} mb="md">
            Contacts
          </Title>
          <Button ml="auto" onClick={toggleCreateModal}>
            Add Contact
          </Button>
        </Flex>
        {error && (
          <Text c="red" mb="md">
            {error}
          </Text>
        )}
        <Loader isLoading={authLoading} />
        {contactsLoading ? (
          <Loader isLoading={contactsLoading} />
        ) : contacts.length > 0 ? (
          <ContactsTable contacts={contacts} handleOpenDeleteModal={handleOpenDeleteModal} />
        ) : (
          <Text mt="md">Contacts not found.</Text>
        )}
      </Flex>
      <CreateContactModal
        isOpen={createModalOpened}
        onClose={toggleCreateModal}
        onSubmit={handleCreateNewContact}
        userId={user?.id || ''}
      />

      <DeleteContactModal
        isOpen={deleteModalOpened}
        onClose={toggleDeleteModal}
        onDelete={handleDeleteContact}
        title="Delete Contact"
        size="sm"
      />
    </>
  );
};

export default Page;

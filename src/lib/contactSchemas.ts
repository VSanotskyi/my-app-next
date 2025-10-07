import { object, string } from 'yup';
import { Database } from '@/types/supabase';

export type Contact = Database['public']['Tables']['contacts']['Row'];
type NewContact = Database['public']['Tables']['contacts']['Insert'];

export type ICreateContact = NewContact;

export const createContactInitialValues: ICreateContact = {
  name: '',
  phone: '',
  user_id: '',
};

export const contactSchema = object({
  name: string()
    .trim()
    .min(3, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),

  phone: string()
    .matches(
      /^\+380 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
      'Phone number must be in format +380 (00) 000-00-00',
    )
    .required('Phone number is required'),

  user_id: string().required('User ID is required'),
});

import { object, string } from 'yup';

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export const signUpInitialValues: ISignUp = {
  name: '',
  email: '',
  password: '',
};

export const SignUpSchema = object({
  name: string().min(3, 'To short').max(50, 'To long').required('Name is required'),
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)'),
});

export interface ISignIn {
  email: string;
  password: string;
}

export const signInInitialValues: ISignIn = {
  email: '',
  password: '',
};

export const SignInSchema = object({
  email: string().email('Invalid email').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)'),
});

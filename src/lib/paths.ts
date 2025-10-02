interface IPaths {
  welcome: string;
  contacts: string;
  auth: {
    signIn: string;
    signUp: string;
  };
}

export const PATHS: IPaths = {
  welcome: '/welcome',
  contacts: '/contacts',
  auth: {
    signIn: '/signIn',
    signUp: '/signUp',
  },
};

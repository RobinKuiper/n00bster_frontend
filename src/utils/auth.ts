import jwtDecode from "jwt-decode";

const isBrowser: boolean = typeof window!== undefined;

const getUser: any = (): object => {
  let user = localStorage.getItem('user');
  return user ? JSON.parse(user) : {};
}

const setUser = (user: object) => localStorage.set('user', JSON.stringify(user));

interface UserData {
  username: string;
  password: string;
}
export const handleLogin = ({ username, password }: UserData): boolean => {

  fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      if(data['success']) {
        localStorage.setItem('token', data['token']);
        const decoded = jwtDecode(data);
        localStorage.setItem('user', decoded['user']);
      }
    })
    .catch(e => {
      console.error(e);
    });


  return false;
}

export const isLoggedIn = (): boolean => {
  if(!isBrowser) return false;

  const user = getUser();

  return !!user.email;
}

export const getCurrentUser = (): object => isBrowser && getUser();

export const logout = (callback: Function) => {
  if (!isBrowser) return false;

  setUser({});
  callback();
}
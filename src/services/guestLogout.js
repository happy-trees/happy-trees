export const guestLogout = () => {
  return fetch('http://localhost:3000/api/v1/auth/logout', {
    mode: 'cors',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(res => res.json());
};

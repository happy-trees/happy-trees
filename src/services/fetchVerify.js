export const fetchVerify = () => {
  return fetch('http://localhost:3000/api/v1/auth/verify', {
    mode: 'cors',
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })
    .then(res => res.json());
};

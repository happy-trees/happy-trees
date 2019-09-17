export const guestSignUp = (nickname, avatar) => {
  return fetch('http://localhost:3000/api/v1/auth/guest', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nickname, avatar })
  })
    .then(res => {
      if(!res.ok) throw 'Could not login';
      return res.json();
    });
};



const bob = 'https://artanddesigninspiration.com/wp-content/uploads/2019/07/bobross-happy-trees.jpg';

export const guestSignUp = (nickname, avatar = bob) => {
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


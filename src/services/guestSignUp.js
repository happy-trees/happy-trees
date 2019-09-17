import bobavgreen from '../assets/avatars/bobavgreen.png';



export const guestSignUp = (nickname, avatar = bobavgreen) => {
  return fetch('https://happy-trees-api.herokuapp.com/api/v1/auth/guest', {
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



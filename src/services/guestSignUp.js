// import bobavblue from '../assets/avatars/bobavblue.png';
import bobavgreen from '../assets/avatars/bobavgreen.png';
// import bobavpink from '../assets/avatars/bobavpink.png';
// import bobavpurple from '../assets/avatars/bobavpurple.png';


export const guestSignUp = (nickname, avatar = bobavgreen) => {
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



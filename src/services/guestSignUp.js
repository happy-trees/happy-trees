const bob = 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjF9NiPnM7kAhXkNX0KHeuBCcEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2q8i1q8u2y3w7u2_bobross-bob-ross%2F&psig=AOvVaw0Dvz1byIC8K6Z-hE-pTvwG&ust=1568478530435818';


export const guestSignUp = (nickname, avatar = bob) => {
  return fetch('http://localhost:3000/api/v1/auth/guest', {
    method: 'POST',
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


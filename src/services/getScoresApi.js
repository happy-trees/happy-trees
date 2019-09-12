const getScores = async() => {
  const res = await fetch('add in URL');
  if(res.status == 200) {
    const data = await res.json();
    console.log('Data:', data);
    return data;
  } throw new Error(res.status);  
};
        
export default getScores;


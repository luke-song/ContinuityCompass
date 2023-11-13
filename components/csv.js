// Legacy CSV code, refactored in main.js

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function CSV() {
//   const [data, setData] = useState(null);
//   const [url, setUrl] = useState('');

//   const fetchData = () => {
//     axios.post('http://localhost:8000/', {
//         url: url
//     })
//     .then(response => setData(response.data))
//     .catch(error => console.error(`Error: ${error}`));
//   } 
  
//   return (
//     <div>
//       <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
//       <button onClick={fetchData}>Send URL</button>
//       {data && data.FleschData.map((item, index) => (
//   <table key={index}>
//     <tr>
//       <td>{item.TotalWords}</td>
//       <td>{item.TotalSentences}</td>
//       <td>{item.TotalSyllables}</td>
//       <td>{item.FleschReadingEase}</td>
//       <td>{item.FleschGradeLevel}</td>
//     </tr>
//   </table>
// ))}
//     </div>
//   );
// }

// export default CSV;
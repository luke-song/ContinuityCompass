import { useState, useEffect } from 'react';
import axios from 'axios';

function CSV() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState('');

  const fetchData = () => {
    axios.post('http://localhost:8000/', {
        url: url
    })
    .then(response => setData(response.data))
    .catch(error => console.error(`Error: ${error}`));
  }

  return (
    <div>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
      <button onClick={fetchData}>Send URL</button>
      {data && <p>{data.Hello}</p>}
    </div>
  );
}

export default CSV;
import { useState, useEffect } from "react";
import http from 'axios';

function App() {
  const [title, setTitle] = useState("");
  const [characters, setCharacters] = useState("");
  const [serieses, setSerieses] = useState([])
  
  const create = async () => {
    await http.post('http://localhost:3000/api/serieses', {
      name: title,
      charList: characters.split(',')
    })
    load();
    setTitle("");
    setCharacters("");
  };
  const del = async (id) => {
    const result = await http.delete(`http://localhost:3000/api/serieses/${id}`);
    load();
  };
  
  const load = async () => {
    const result = await http.get('http://localhost:3000/api/serieses');
    setSerieses(result.data);
  }
  
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="App">
      <input type="text" placeholder="name" name="name" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea name="characters" placeholder="characters" value={characters} onChange={(e) => setCharacters(e.target.value)}></textarea>
      <button onClick={() => create()}>create</button>
      {serieses.map( (series, index) => (
        <div key={series.id}>
          <h2>{series.name}</h2>
          <ul>
            {series.characters.map( (character, index) => (
              <li key={index}>{character}</li>
            ))}
          </ul>
          <button onClick={() => del(series.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;

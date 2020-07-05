import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [tech, setTech] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
      const loadData = async () => {
        const response = await api.get('/repositories');

        setRepositories(response.data);
      }

      loadData();
  }, []);

  async function handleAddRepository(event) {
    event.preventDefault();

    const repository = {
      title,
      url,
      techs
    };

    const response = await api.post('/repositories', repository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const repos = repositories.filter(repository => repository.id !== id);

    setRepositories(repos);
  }

  const handleAddTech = (e) => {
    e.preventDefault();
    setTechs([...techs, tech])
    setTech('');
  }

  return (
      <div className="container">
        <h1>Repositórios</h1>
        <form action="">
          <input 
            type="text" 
            name="title"
            value={title}
            placeholder="Digite o nome do repositório"
            onChange={event => setTitle(event.target.value)}
          />
          <input 
            type="text" 
            name="url"
            value={url}
            placeholder="Digite a url"
            onChange={event => setUrl(event.target.value)}
          />
          <div className="techs">
            <input 
              type="text" 
              name="techs"
              value={tech}
              placeholder="Tecnologia"
              onChange={event => setTech(event.target.value)}
            />
            <button onClick={handleAddTech}>Adicionar uma tech</button>
            {techs.length > 0 ? 
            <div className="techs-list">
              {techs.map(tech => (
                <span key={tech}>{tech}</span>
              ))}
            </div> : <div />}
          </div>
          <button type="submit" onClick={handleAddRepository}>Adicionar</button>
        </form>
        <hr />
        <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li>
                {repository.title}
   
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
           </li>
          ))}
        </ul>

      </div>
  );
}

export default App;

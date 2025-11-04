import { useEffect, useState } from 'react';
import './App.css';
import Titulo from './components/Titulo';
import CardPet from './components/CardPet';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function buscarPets() {
      try {
        const resposta = await fetch("http://localhost:3001/pets");
        if (!resposta.ok) throw new Error("Erro ao consultar os pets");
        const dados = await resposta.json();
        setPets(dados.reverse());
      } catch (erro) {
        console.log("Erro:", erro.message);
      }
    }

    buscarPets();
  }, []);

  const listaPets = pets.map((pet) => (
    <CardPet key={pet.id} pet={pet} setPets={setPets} />
  ));

  return (
    <>
      <Titulo />
      <h1 style={{ marginTop: 0 }}>Lista de Pets Cadastrados</h1>
      <section className="grid-pets">{listaPets}</section>
    </>
  );
}

export default App;

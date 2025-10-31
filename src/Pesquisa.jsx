import { useForm } from "react-hook-form"
import './Pesquisa.css'
import Titulo from './components/Titulo'
import { useState } from "react"
import CardPet from "./components/CardPet"

function Pesquisa() {
  const { register, handleSubmit } = useForm()
  const [pets, setPets] = useState([])

  async function pesquisaPets(data) {
    try {
      const resposta = await fetch("http://localhost:3001/pets")
      if (!resposta.ok) throw new Error("Erro ao consultar os pets")
      const dados = await resposta.json()
      const filtrados = dados.filter(pet =>
        pet.nome.toUpperCase().includes(data.pesquisa.toUpperCase()) ||
        pet.especie.toUpperCase().includes(data.pesquisa.toUpperCase())
      )
      if (filtrados.length === 0) {
        alert("Não há pets com essa palavra-chave")
      } else {
        setPets(filtrados)
      }
    } catch (erro) {
      console.log("Erro: ", erro.message)
    }
  }

  const listaPets = pets.map(pet => (
    <CardPet key={pet.id} pet={pet} />
  ))

  return (
    <>
      <Titulo />
      <h1 style={{ marginTop: 0 }}>Pesquisa de Pets</h1>
      <form className='form-pesquisa' onSubmit={handleSubmit(pesquisaPets)}>
        <input type="text" className='campo-pesquisa' required
          placeholder="Nome ou espécie"
          {...register("pesquisa")} />
        <input type="submit" value="Pesquisar" className='btn-pesquisa' />
      </form>

      <section className='grid-pets'>
        {listaPets}
      </section>
    </>
  )
}

export default Pesquisa

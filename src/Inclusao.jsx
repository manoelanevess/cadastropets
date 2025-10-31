import { useForm } from "react-hook-form"
import './Inclusao.css'
import Titulo from './components/Titulo'

function Inclusao() {
  const { register, handleSubmit, reset } = useForm()

  async function incluirPet(data) {
    const novoPet = {
      ...data,
      nomes: [],
      comentarios: [],
      notas: []
    }

    try {
      const resposta = await fetch("http://localhost:3001/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoPet)
      })
      if (!resposta.ok) throw new Error("Erro ao incluir pet")

      alert("Pet cadastrado com sucesso! 🐾")
      reset()
    } catch (erro) {
      console.log("Erro:", erro.message)
    }
  }

  return (
    <>
      <Titulo />
      <h1>Cadastro de Pets 🐶🐱</h1>
      <form className='form-inclusao' onSubmit={handleSubmit(incluirPet)}>
        <input type="text" placeholder="Nome do pet" {...register("nome")} required />
        <input type="text" placeholder="Espécie (cachorro, gato...)" {...register("especie")} required />
        <input type="number" placeholder="Idade" {...register("idade")} required />
        <input type="text" placeholder="URL da imagem" {...register("imagem")} />
        <textarea placeholder="Descrição do pet" {...register("descricao")} required></textarea>
        <input type="submit" value="Cadastrar" className='btn-inclusao' />
      </form>
    </>
  )
}

export default Inclusao

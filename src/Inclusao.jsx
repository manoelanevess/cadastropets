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
      notas: [],
      tarefas: []
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
        <div className="form-grid">
          <input type="text" placeholder="Nome do pet" {...register("nome")} required />
          <input type="text" placeholder="Espécie (cachorro, gato...)" {...register("especie")} required />

          <select {...register("sexo")} required>
            <option value="">Selecione o sexo</option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <input type="number" placeholder="Idade" {...register("idade")} required />

          {/* 🆕 Campo Castrado */}
          <select {...register("castrado")} required>
            <option value="">Castrado?</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>

          <input type="text" placeholder="URL da imagem" {...register("imagem")} />
          <textarea placeholder="Descrição do pet" {...register("descricao")} required></textarea>
        </div>

        <input type="submit" value="Cadastrar" className='btn-inclusao' />
      </form>
    </>
  )
}

export default Inclusao

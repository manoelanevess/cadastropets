import Swal from 'sweetalert2'
import './CardPet.css'
import withReactContent from "sweetalert2-react-content"
import { useForm } from "react-hook-form"
import Estrelas from './Estrelas'
import { Link } from 'react-router-dom'

const MySwal = withReactContent(Swal)

function CardPet({ pet, setPets }) {
  const { register, handleSubmit, reset } = useForm()

  async function enviarComentario(data) {
    const { nome, comentario, nota } = data

    const petAlterado = {
      ...pet,
      nomes: [...pet.nomes, nome],
      comentarios: [...pet.comentarios, comentario],
      notas: [...pet.notas, Number(nota)]
    }

    try {
      const resposta = await fetch(`http://localhost:3001/pets/${pet.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petAlterado),
      })
      if (!resposta.ok) throw new Error("Erro ao incluir avaliação")

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Avaliação cadastrada com sucesso 🐾",
        showConfirmButton: false,
        timer: 2000,
      })

      const respostaLista = await fetch("http://localhost:3001/pets")
      const dados = await respostaLista.json()
      setPets(dados.reverse())
    } catch (erro) {
      console.error("Erro: " + erro.message)
    }
    reset()
  }

  function avaliarPet() {
    MySwal.fire({
      title: `Avaliação: ${pet.nome}`,
      html: (
        <form onSubmit={handleSubmit(enviarComentario)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <input type="text" placeholder="Seu nome"
            className="swal2-input" style={{ width: 300 }}
            required {...register("nome")}
          />
          <input type="text" placeholder="Comentário"
            className="swal2-input" style={{ width: 300 }}
            required {...register("comentario")}
          />
          <input type="number" placeholder="Nota (1 a 5)"
            className="swal2-input" style={{ width: 300 }}
            min="1" max="5" required {...register("nota")}
          />
          <button type="submit" className="swal2-confirm swal2-styled" style={{ marginTop: "20px" }}>
            Enviar
          </button>
        </form>
      ),
      showConfirmButton: false,
    })
  }

  function calculaMedia() {
    let soma = 0
    for (const nota of pet.notas) soma += nota
    return soma / pet.notas.length
  }

  return (
    <div className='cards'>
      <div>
        <img src={pet.imagem} alt="Foto do pet" />
      </div>
      <div className='divpet'>
        <h3>{pet.nome}</h3>
        <h4>{pet.especie} - {pet.idade} anos</h4>
        <p className="p-desc">{pet.descricao}</p>
        <div className="div-botao">
            {pet.notas.length === 0 && (
            <img src="./new.png" alt="Novo" className="new" />
              )}
            <button className="btn-avaliar" onClick={avaliarPet}>
                Adotar
            </button>
        </div>

      </div>
    </div>
  )
}

export default CardPet

import { Link } from "react-router-dom";
import "./Titulo.css";

export default function Titulo() {
  return (
    <>
      <header>
        <div className="divHeader">
          <div className="divImage">
            <img className="logoImage" src="./logovazia.png" alt="Logo PetNotes" />
          </div>
          <div className="title">
            <h1>PetNotes</h1>
            <h2>Organize e cuide dos seus pets</h2>
          </div>
        </div>
      </header>
      <nav>
        <Link to="/" className='links'>Home</Link>&nbsp;&nbsp;
        <Link to="/inclusao" className='links'>Cadastro</Link>&nbsp;&nbsp;
        <Link to="/pesquisa" className='links'>Pesquisa</Link>
      </nav>
    </>
  );
}

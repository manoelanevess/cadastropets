import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Estrelas.css";

export default function Estrelas({ num }) {
  const icones = [];

  for (let i = 1; i <= Math.floor(num); i++) {
    icones.push(<FaStar key={i} />);
  }

  if (!Number.isInteger(num)) {
    icones.push(<FaStarHalfAlt key="half" />);
  }

  return <div className="estrelas">{icones}</div>;
}

import pikachu from "../assets/img/Pikachu.webp"

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1>Bienvenido Maestro Pokémon</h1>
      <img src={pikachu} alt="Pikachu img" className="imgPikachu"/>
    </div>
  )
}

export default Home;
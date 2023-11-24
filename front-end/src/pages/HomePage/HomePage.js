import styles from "./HomePage.module.css";
import DivPokemonsOfTheWeek from "../../components/DivPokemonsOfWeek/DivPokemonsOfWeek";
import DivTopUsers from "../../components/DivTopUsers/DivTopUsers";
import DivTopPokemons from "../../components/DivTopPokemons/DivTopPokemons";
import DivCountsForHome from "../../components/DivCountsForHome/DivCountsForHome";

function HomePage () {
  return (
    <div className={styles.homePage}>
      <img className={styles.womenTrainer} alt="" src="/womenTrainer.png" />
      <img className={styles.menTrainer} alt="" src="/menTrainer.png" />
      <DivTopPokemons className={styles.divTopPokemons}/>
      <DivTopUsers className={styles.divTopUsers}/>
      <DivPokemonsOfTheWeek/>      
      <DivCountsForHome/>      
    </div>
  );
};

export default HomePage;
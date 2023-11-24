import styles from './DivCountsForHome.module.css';

function DivCountsForHome() {
    const countBattles = 210;
    const countPokemons = 150;

    return (
        <div className={styles.divContagens}>
        <div className={styles.divContagensChild} />
        <div className={styles.contadorBatalhas}>
          <div className={styles.property1default}>
            <div className={styles.property1defaultChild} />
            <div className={styles.div30}>{countBattles}</div>
            <div className={styles.batalhasRealizadas}>Batalhas Realizadas</div>
          </div>
        </div>
        <div className={styles.contadorPokemons}>
          <div className={styles.property1defaultChild} />
          <div className={styles.div30}>{countPokemons}</div>
          <div className={styles.pokemonsResgatados}>
            <p className={styles.pokemons}>Pokemons</p>
            <p className={styles.pokemons}>Resgatados</p>
          </div>
        </div>
      </div>)};

export default DivCountsForHome;
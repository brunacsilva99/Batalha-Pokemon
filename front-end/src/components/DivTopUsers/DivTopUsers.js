import styles from './DivTopUsers.module.css';

const DivTopUsers = () => {
    return (
        <div className={styles.divTopUsers}>
        <div className={styles.divTopUsersChild} />
        <div className={styles.titleDiv1}>
          <div className={styles.divisoriaReaDiv2} />
          <div className={styles.titleTabela1}>
            Top 10 Treinadores em Quantidade de Vitórias
          </div>
        </div>
        <div className={styles.tabelaUsers}>
          <div className={styles.contedo1}>
            
          </div>
          <div className={styles.cabealho1}>
            <div className={styles.cabealhoChild} />
            <div className={styles.qtdePokemons}>Qtde Pokemons</div>
            <div className={styles.qtdeVitrias}>Qtde Vitórias</div>
            <div className={styles.treinador1}>Treinador</div>
          </div>
          <div className={styles.divisoria014} />
          <div className={styles.divisoria015} />
        </div>
      </div>)};

export default DivTopUsers;
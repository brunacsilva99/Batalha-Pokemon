import styles from './DivTopPokemons.module.css';
import AreaForHome from '../AreaForHome/AreaForHome';

function AreaTopPokemons({data, columns}){

  return(
    <div className={styles.divTopPokemons}>
    <AreaForHome 
    titleArea='Top 10 Pokemons Em Dano'
    data={[{Pokemon:'Pikachu', Level:99, Dano:'1000', Tipo:'Elétrico', Treinador:'Ash'}]}
    columns={[
      {
        Header: 'Pokemon',
        accessor: 'Pokemon',
      },
      {
        Header: 'Level',
        accessor: 'Level',
      },
      {
        Header: 'Dano',
        accessor: 'Dano',
      },
      {
        Header: 'Tipo',
        accessor: 'Tipo',
      },
      {
        Header: 'Treinador',
        accessor: 'Treinador',
      },
    ]} />
    </div>
  );

}

export default AreaTopPokemons;
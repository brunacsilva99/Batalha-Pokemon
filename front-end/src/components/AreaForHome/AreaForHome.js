import styles from './AreaForHome.module.css';
import {useTable} from 'react-table';
import TitleForArea from '../TitleForArea/TitleForArea';

function AreaForHome({titleArea, data, columns}) {
    // Configurações e hooks do React Table
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data });
  
    return (
      <div className={styles.divArea}>
        <TitleForArea title = {titleArea}/>
        
        <div className={styles.divTable}>
        <table {...getTableProps()}>
          <div className={styles.header}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}  className={styles.headerItem}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}            
          </thead>
          </div>
          <tbody {...getTableBodyProps()} className={styles.body}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>)};

export default AreaForHome;
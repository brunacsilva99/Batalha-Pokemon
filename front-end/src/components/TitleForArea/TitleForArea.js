import styles from './TitleForArea.module.css';

function TitleForArea({ title }) {
    return (
      <div className={styles.titleRegion}>
        <div className={styles.titleOfArea}>{title}</div>
        <div className={styles.lineOfTitle} />
      </div>
    );
  }
    
  export default TitleForArea;
  
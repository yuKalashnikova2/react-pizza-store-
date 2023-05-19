import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        Такой страницы не существует в нашем интернет-магазине
      </p>
    </div>
  )
}

export default NotFoundBlock

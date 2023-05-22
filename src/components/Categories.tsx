
type CategoriesProps = {
  value: number,
  onClickCategory: (index: number) => void
}

const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories

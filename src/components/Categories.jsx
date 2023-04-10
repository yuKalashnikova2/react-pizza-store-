import { useState } from 'react'

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState([])

  const categories = [
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  const choseActiveIndex = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((elem, index) => (
          <li key={index}
            onClick={() => choseActiveIndex(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories

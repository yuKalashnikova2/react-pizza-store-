import { useState } from 'react'

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(2)

    const choseActiveIndex = (index) => {
        setActiveIndex(index)
    }


  return (
    <div className="categories">
      <ul>
        <li onClick={() => choseActiveIndex(0)} className={activeIndex === 0 ? "active" : ""}>Все</li>
        <li onClick={() => choseActiveIndex(1)} className={activeIndex === 1 ? "active" : ""}>Мясные</li>
        <li onClick={() => choseActiveIndex(2)} className={activeIndex === 2 ? "active" : ""}>Вегетарианская</li>
        <li onClick={() => choseActiveIndex(3)} className={activeIndex === 3 ? "active" : ""}>Гриль</li>
        <li onClick={() => choseActiveIndex(4)} className={activeIndex === 4 ? "active" : ""}>Острые</li>
        <li onClick={() => choseActiveIndex(5)} className={activeIndex === 5 ? "active" : ""}>Закрытые</li>
      </ul>
    </div>
  )
}

export default Categories

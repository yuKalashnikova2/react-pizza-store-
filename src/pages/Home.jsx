import { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = ({searchInput}) => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [categortId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  })

  useEffect(() => {
    setIsLoading(true)

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchInput ? `&search=${searchInput}` : '';
    fetch(
      `https://64340e691c5ed06c958de2ee.mockapi.io/items?${
        categortId > 0 ? `category=${categortId}` : ''
      }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categortId, sortType, searchInput])

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categortId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.filter((obj) => {
            if(obj.title.toLowerCase().includes(searchInput.toLowerCase())) {
              return true
            }
            return false
          })
          .map((obj, index) => <PizzaBlock key={index} {...obj} />)}
      </div>
    </div>
  )
}

export default Home

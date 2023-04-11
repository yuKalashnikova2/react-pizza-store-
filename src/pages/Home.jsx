import { useState, useEffect } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://64340e691c5ed06c958de2ee.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json)
        setIsLoading(false)
      })
      window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
      </div>
    </div>
  )
}

export default Home

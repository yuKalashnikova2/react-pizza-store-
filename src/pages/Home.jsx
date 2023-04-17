import { useState, useEffect, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId } from '../redux/slices/sliceFilter'
import axios from 'axios'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import { SearchContext } from '../App'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort } = useSelector((store) => store.filter)
  const sortType = sort.sortProperty

  const { searchInput } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const order = sortType.includes('-') ? 'asc' : 'desc'
    const search = searchInput ? `&search=${searchInput}` : ''
    axios
      .get(
        `https://64340e691c5ed06c958de2ee.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType.replace('-', '')}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchInput])

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items
              .filter((obj) => {
                if (
                  obj.title.toLowerCase().includes(searchInput.toLowerCase())
                ) {
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

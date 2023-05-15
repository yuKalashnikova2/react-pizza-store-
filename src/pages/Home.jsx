import { useState, useEffect, useContext, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/sliceFilter'
import axios from 'axios'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'
import Search from '../components/Search/Search'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage } = useSelector((store) => store.filter)


  const { searchInput } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const fetchPizza = () => {
    setIsLoading(true)

    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchInput ? `&search=${searchInput}` : ''
    axios
      .get(
        `https://64340e691c5ed06c958de2ee.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        alert('ОШИБКА ПРИ ПОЛУЧЕНИИ ПИЦЦЫ! Пожалуйста, повторите попытку')
        console.log('ERROR AXIOS', error)
      })
  
  }   

  useEffect(() => {
 
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])

  useEffect(() => {
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])



  useEffect(() => {
    window.scrollTo(0, 0)

    if(!isSearch.current) {
      fetchPizza()
    }
   
    

    isSearch.current = false

  }, [categoryId, sort.sortProperty, searchInput, currentPage])





  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <div className="content__main">
        <h2 className="content__title">Все пиццы</h2>
        <Search />
      </div>

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

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

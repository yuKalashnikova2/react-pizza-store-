import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/sliceFilter'
import { fetchPizza, selectPizza } from '../redux/slices/slicePizza'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'
import Search from '../components/Search/Search'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const { categoryId, sort, currentPage, searchInput } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectPizza)

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizza = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchInput ? `&search=${searchInput}` : ''

    dispatch(
      // @ts-ignore
      fetchPizza({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    )
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage, navigate])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty)

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizza()
      console.log(getPizza())
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

      {status === 'error' ? (
        <div className="cart--empty">
          <h2>
            Произошла ошибка<span>😕</span>
          </h2>
          <p>
            Не удалось получить пиццы
            <br />
            Попробуйте перезагрузить страницу
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
            : items
                .filter((obj: any) => {
                  if (
                    obj.title.toLowerCase().includes(searchInput.toLowerCase())
                  ) {
                    return true
                  }
                  return false
                })
                .map((obj: any, index: number) => <PizzaBlock key={index} {...obj} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

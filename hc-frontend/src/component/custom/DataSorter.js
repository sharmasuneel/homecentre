/* eslint-disable */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setProducts } from '../../redux/slices/CartSlice'
import dataService from '../../services/dataServices'

const DataSorter = (props) => {
    const { products, searchCriteria } = props
    const dispatch =  useDispatch()

    function onDataSort(value) {
        const sortedData = dataService.postData('http://localhost:3020/sortedList', { searchCriteria, sortBy, orderBy })
        dispatch(setProducts(sortedData))
    }
    return (
        <div style={{width: 200, height: 200, backgroundColor: 'red'}}>
            <select onChange={onDataSort}>
                <option>Sort by Price low to high</option>
                <option>Sort by Price high to low</option>
                <option>Sort by Price rating</option>
            </select>
        </div>
    )
}

export default DataSorter
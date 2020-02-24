import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'
import _ from 'underscore'

class MainContainer extends Component {

  state = {
    allStocks: [],
    portfolioStocks: [],
    buyableStocks: [],
    displayOptions: {
      filterBy: 'Tech',
      sortBy: 'Price'
    }
  }



  shownBuyableStocks() {  

    const filter = this.state.displayOptions.filterBy
    const sort = this.state.displayOptions.sortBy === "Price" ? "price" : "name"
    const filteredBuyableStocks = this.state.allStocks.filter(s => (s.type === filter) && !this.stockInCollection(s.id, 'portfolioStocks'))
    return _.sortBy(filteredBuyableStocks, sort)
  }
  
  onSortRadioChange = (e) => {
    const value = e.target.value
    this.setState(prevState => {
      return {...prevState,
        displayOptions: {
          ...prevState.displayOptions,
          sortBy: value
        }
      }
    })
  }

  onFilterSelectChange = (e) => {
    const value = e.target.value
    this.setState(prevState => {
      return {
        ...prevState,
        displayOptions: {
          ...prevState.displayOptions,
          filterBy: value
        }
      }
    })
  }

  componentDidMount() {
     this.getAllStocks().then(stocks => this.setState((prevState) => {
       return {
         ...prevState,
         allStocks: stocks,
         buyableStocks: stocks
       }
     })).catch(err => console.log(err))
  }

  getAllStocks() {
     return fetch("http://localhost:3000/stocks").then(resp => resp.json())
  }

  buyStock(stock) {
    // add stock to portfolio
    // remove stock from buyablestocks
    this.setState(prevState => {
      return {
        ...prevState,
        portfolioStocks: [...prevState.portfolioStocks, stock],
        buyableStocks: prevState.buyableStocks.filter(s => stock.id !== s.id)
      }
    })
    console.log("buying stock")
  }

  onStockClick = stock => {
     if (this.stockInCollection(stock.id, 'portfolioStocks')) this.sellStock(stock)
     else this.buyStock(stock)
  }

  findStock(stockId, collection) {
    const foundStock = this.state[collection].find(s => stockId === s.id )
    return foundStock
  }

  stockInCollection(stockId, collection) {
    if (this.findStock(stockId, collection)) return true
    else return false
  }

  sellStock(stock) {
    // add stock to buyablestocks
    // remove stock from portfolio

    this.setState(prevState => {
      return {
        ...prevState,
        buyableStocks: [...prevState.buyableStocks, stock],
        portfolioStocks: prevState.portfolioStocks.filter(s => stock.id !== s.id)
      }
    })
    console.log("sellingStock")
  }

  render() {
    return (
      <div>
        <SearchBar onSortRadioChange={this.onSortRadioChange} displayOptions={this.state.displayOptions} onFilterSelectChange={this.onFilterSelectChange}  />

          <div className="row">
            <div className="col-8">

              <StockContainer onStockClick={this.onStockClick} stocks={this.shownBuyableStocks()}/>

            </div>
            <div className="col-4">

              <PortfolioContainer onStockClick={this.onStockClick} stocks={this.state.portfolioStocks} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;

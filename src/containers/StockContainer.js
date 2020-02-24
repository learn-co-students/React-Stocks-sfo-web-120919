import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        
          {this.props.stocks.map(stock => <Stock onStockClick={this.props.onStockClick} stock={stock} key={Math.random()} />)}
        
      </div>
    );
  }

}

export default StockContainer;

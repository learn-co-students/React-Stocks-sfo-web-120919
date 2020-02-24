import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          
            {this.props.stocks.map(stock => <Stock onStockClick={this.props.onStockClick} stock={stock} key={Math.random()} />)}
          
      </div>
    );
  }

}

export default PortfolioContainer;

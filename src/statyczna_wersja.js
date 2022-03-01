import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './logo.svg';
import dodrukSvg from './dodruk.svg';
import premieraSvg from './premiera.svg';

class ProductMonthDay extends React.Component {
  render() {
    const monthAndDay = this.props.day!==null ? this.props.month+" "+this.props.day : this.props.month;
    const rows = [];
    
    this.props.products.forEach((product) => {
      if ((product.year === this.props.year)&&(product.month === this.props.month)&&(product.day === this.props.day)) {
        rows.push(
          <Product
            product={product}
            key={product.name} 
          />
        );
      }
    });
    return (
      <div className='monthContainer'>
        <div className='calendarCard'>
          {monthAndDay}
        </div>
        <div className='productsContainer'>
          {rows}
        </div>
      </div>
    );
  }
}
class ProductYear extends React.Component {
  render() {
    const year = this.props.year;
    const rows = [];
    
    this.props.products.forEach((product) => {
      if ((product.year === this.props.year)&&(product.month === null)&&(product.day === null)) {
        rows.push(
          <Product
          product={product}
          key={product.name} />
        );
      }
    });
    return (
      <div className='monthContainer'>
        <div className='calendarCard'>
          {year}
        </div>
        <div className='productsContainer'>
          {rows}
        </div>
      </div>
    );
  }
}

class Product extends React.Component {
  render() {
    const product = this.props.product;
    const dodruk = product.printing ?
      <img src={dodrukSvg} /> :
      null;
    const premiera = product.premiere ?
      <img src={premieraSvg} /> :
      null;
    return (
      <div className='product'>
        {dodruk}
        {premiera}
        <span>{product.name}</span>
      </div>
    );
  }
}

class YearFilter extends React.Component {
  render() {
    return (
      <div className='bttnFilter'>
        {this.props.year}
      </div>
    );
  }
}
class MonthFilter extends React.Component {
  render() {
    return (
      <div className='bttnFilter'>
        {this.props.month}
      </div>
    );
  }
}
class Filter extends React.Component {
  render() {
    const years = [];
    const months = ['styczeń', 'luty', 'marzec', 'kwiecień', 
      'maj', 'czerwiec', 'lipiec', 'sierpień', 
      'wrzesień', 'październik', 'listopad', 'grudzień'];
    const monthsDiv = [];
    let lastYear = null;
    
    this.props.products.forEach((product) => {
      if (product.year !== lastYear) {
        years.push(
          <YearFilter
            year={product.year}
            key={product.year} />
        );
      }
      lastYear = product.year;
    });

    months.forEach((month) => {
      monthsDiv.push(
        <MonthFilter 
          month={month}
          key={month} 
        />
      );
    });

    return (
      <div>
        <div className='bttnFilterContainer'>
          {years}
        </div>
        <div className='bttnFilterContainer'>
          {monthsDiv}
        </div>
      </div>
    );
  }
}
class Calendar extends React.Component {
  render() {
    const rows = [];
    let lastYear = null;
    let lastMonth = null;
    let lastDay= null;
    
    this.props.products.forEach((product) => {
      if (product.year !== lastYear) {
        rows.push(
          <ProductYear
            products={this.props.products}
            year={product.year}
            key={product.year} />
        );
      }
      if (((product.month !== lastMonth)||(product.day !== lastDay))&&((product.month !== null)||(product.day !== null))) {
        rows.push(
          <ProductMonthDay
            products={this.props.products}
            year={product.year}
            month={product.month}
            day={product.day}
            key={product.month+product.day} />
        );
      }else if (((product.month !== lastMonth)||(product.day !== lastDay))&&(product.day !== null)) {
        rows.push(
          <ProductMonthDay
            products={this.props.products}
            year={product.year}
            month={product.month}
            day={''}
            key={product.month+product.day} />
        );
      }
      lastYear = product.year;
      lastMonth = product.month;
      lastDay = product.day;
    });

    return (
      <div className='calendarContainer'>
        <h1>Kalendarz premier i dodruków. Tworzony przez:</h1>
        <div className='creators'>
          <img src={require('./logobn.png')} />
          <img src={require('./ontable.png')} />
          <img src={require('./planszeo.png')} />
        </div>
        <Filter products={this.props.products} />
        <div className='calendar'>
          {rows}
        </div>
        <Filter products={this.props.products} />
      </div>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input className='searchBar' type="text" placeholder="Wpisz tytuł gry" />
      </form>
    );
  }
}

class FilterablePage extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div class="leftSideNav">
            <img src={logo}/>
            <SearchBar
            />
          </div>
          <div class="rightSideNav">
            <a href="#">Nowości</a>
            <a href="#">Rankingi</a>
            <a href="#">O planszeo</a>
            <a href="#">Współpraca</a>
            <a href="#">Blog</a>
          </div>
        </nav>
        <div>
          <div className='appTitle'>APLIKACJA MOBILNA Planszeo</div>
          <div className='appSubtitle'>KALENDARZ premier i dodruków</div>
          <Calendar products={this.props.products} />
        </div>
      </div>
    );
  }
}


const PRODUCTS = [
  {year: 2021, month: null, day: null, printing: true, premiere: false, name: 'Zatoka Kupców: Oberżysta'},
  {year: 2021, month: 'styczeń', day: null, printing: false, premiere: true, name: 'Oath: Kroniki Władzy i Banicji'},
  {year: 2021, month: 'styczeń', day: 1, printing: false, premiere: true, name: 'Zatoka Kupców: Sekretna skrytka'},
  {year: 2021, month: 'styczeń', day: 1, printing: false, premiere: false, name: 'Massive Darkness'},
  {year: 2021, month: 'styczeń', day: 2, printing: true, premiere: false, name: 'Batman Everybody Lies'},
  {year: 2021, month: 'luty', day: 4, printing: false, premiere: true, name: 'Talisman: Harry Potter'},
  {year: 2022, month: 'styczeń', day: 21, printing: true, premiere: false, name: 'Talisman: Kingdom Hearts'},
  {year: 2022, month: 'luty', day: 1, printing: true, premiere: false, name: 'Świat Dinozaurów'},
  {year: 2022, month: 'marzec', day: 2, printing: false, premiere: true, name: 'Dominant Species: Marine'},
  {year: 2022, month: 'marzec', day: 2, printing: false, premiere: true, name: 'Amulet'}
];
 
ReactDOM.render(
  <FilterablePage products={PRODUCTS} />,
  document.getElementById('root')
);

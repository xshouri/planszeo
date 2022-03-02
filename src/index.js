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
      <img src={dodrukSvg} className='productInfo'/> :
      null;
      const imageSrc = <img src={product.imageSrc} className='productImg'/>;
    const premiera = product.premiere ?
      <img src={premieraSvg} className='productInfo'/> :
      null;
    return (
      <div className='product'>
        {dodruk}
        {premiera}
        {imageSrc}
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
        <Filter products={this.props.products} />
        <div className='calendar'>
          {rows}
        </div>
      </div>
    );
  }
}

class FilterablePage extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div className='appTitle'>KALENDARZ premier i dodruków</div>
          <Calendar products={this.props.products} />
        </div>
      </div>
    );
  }
}


const PRODUCTS = [
  {year: 2021, month: null, day: null, printing: true, premiere: false, name: 'Zatoka Kupców: Oberżysta', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMG9vQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--cc53f1e6e60d1bbaca70c478972b8ca07377201d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/273505599_1682246428775829_2327840293637288544_n.jpg'},
  {year: 2021, month: 'styczeń', day: null, printing: false, premiere: true, name: 'Oath: Kroniki Władzy i Banicji', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeG9uQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--49c3034effa4e5a2821fd66995a48232083fb05a/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/oath_box3d.png'},
  {year: 2021, month: 'styczeń', day: 1, printing: false, premiere: true, name: 'Zatoka Kupców: Sekretna skrytka', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMGNvQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--871eb1672749c6e4be1be4412d1241348c17045f/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/273266222_324119712985933_65234386825063042_n.jpg'},
  {year: 2021, month: 'styczeń', day: 1, printing: true, premiere: false, name: 'Massive Darkness 2: Heavenfall', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNzRsQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--13d68708d961e358efa91605c2b9848f635c37b1/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/BOX%20heavenfall.png'},
  {year: 2021, month: 'styczeń', day: 2, printing: true, premiere: false, name: 'Batman Everybody Lies', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNzhsQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--8b9331fded24ff3b25e679c0545a60a428a71fba/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/3d_batman_EL_final.png'},
  {year: 2021, month: 'luty', day: 4, printing: false, premiere: true, name: 'Talisman: Harry Potter', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNHdtQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--acf3e3ee74ac57e847b1c52ce04e1513067374de/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/talisman_harry_potter_box_3d_mockup.png'},
  {year: 2022, month: 'styczeń', day: 21, printing: true, premiere: false, name: 'Talisman: Kingdom Hearts', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNDRtQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d6cfd191794bcf58cd7ab1f2db585dc01f96c21d/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/talisman_kingdom_hearts_box_3d_mockup.png'},
  {year: 2022, month: 'luty', day: 1, printing: true, premiere: false, name: 'Wyspa Dinozaurów: Na fali', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBd2dvQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1b5263e84d7f8fc9a474052952325700cc6aea7c/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/272892366_717669536282185_5145556498206587749_n.jpg'},
  {year: 2022, month: 'marzec', day: 2, printing: false, premiere: true, name: 'Icaion', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL29uQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--4cfa3ed88a284d98ae751f0711dccef891761904/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/272764559_446970010448371_2085494126959798695_n.jpg'},
  {year: 2022, month: 'marzec', day: 2, printing: false, premiere: true, name: 'Amulet', imageSrc: 'https://planszeo.pl/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBL2duQWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--1d18096622540cf99dd0504507bc3cf37baf23ec/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBPZ2wzWldKd09oUnlaWE5wZW1WZmRHOWZiR2x0YVhSYkJ6QnBBaXdCIiwiZXhwIjpudWxsLCJwdXIiOiJ2YXJpYXRpb24ifX0=--c86252b3002b3e4d5d5c9b4e8c625712f38134fe/273061439_1142550566283008_2921563123517586432_n.jpg'}
];
 
ReactDOM.render(
  <FilterablePage products={PRODUCTS} />,
  document.getElementById('root')
);

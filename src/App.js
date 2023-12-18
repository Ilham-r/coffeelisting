import React, { useState, useEffect } from 'react';
import './App.css';
import vector from './images/vector.svg';
import heroImg from './images/bg-cafe.jpg';
import nostar from'./images/Star.svg';
import star from './images/Star_fill.svg'

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.available);


  return (
    <div className="App">
      <img src={heroImg} alt="hero" className="hero" />

      <div className="list__page">
        <div className="list__page-text">
          <img src={vector} alt="vector" />
          <h1>Our Collection</h1>
          <p>Introducing our Coffee Collection, a selection of unique coffees from different roast types and origins, expertly roasted in small batches and shipped fresh weekly.</p>
          <div className="list__page-buttons">
            <button
            onClick={() => handleFilterClick('all')} className={filter === 'all' ? 'active' : ''}>
              All Products
            </button>
            <button  onClick={() => handleFilterClick('available')} className={filter === 'available' ? 'active' : ''}>
              Available Now
            </button>
          </div>
        </div>
        <div className="list__wrapper">
          {filteredItems.map(item => (
            <div className="card" key={item.id}>
              <div className="card__image">
                {item.popular ? (<p>Popular</p> ) : ('')}
                <img src={item.image} alt="" />
              </div>
              <div className="card__info">
                <div className="card__info-column">
                  <h4 className="coffee__name">{item.name}</h4>
                  
                    {item.votes ===0?( <div className="card__info-rating">
                        <img src={nostar} alt="star" /> <p className="rate"> <span>No rating</span></p>
                    </div> ):( <div className="card__info-rating"><img src={star} alt="star" />
                    <p className="rate">{item.rating} <span>({item.votes} votes)</span></p>
                    </div>)}
                    
                </div>
                <div className="card__info-column">
                  <p className="card__info-price">{item.price}</p>
                  {item.available ? ('') : (<p className="soldout">Sold out</p>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
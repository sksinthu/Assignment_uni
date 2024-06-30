import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    try {
      let response = await fetch("https://assignment-uni-ap.vercel.app/api/auth/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      setFoodItems(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  }

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 w-75 bg-white text-dark"
                type="search"
                placeholder="Search in here..."
                aria-label="Search"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="burger" />
          </div>
          <div className="carousel-item">
            <img src="https://t4.ftcdn.net/jpg/02/55/57/33/360_F_255573369_NrbcMNYC1hz1xJigxCOCN8OXsxmtx0TB.webp" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="pastry" />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="barbeque" />
          </div>
        </div>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
      </div>
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((data) => {
              return (
                <div key={data.id} className='row mb-3 ' style={{ marginTop: "0px" }}>
                  <div className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItems.length > 0 ? foodItems.filter(
                    (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems.id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} />
                        </div>
                      )
                    }) : <div> No Such Data </div>}
                </div>
              )
            })
            : ""
        }
      </div>
      <Footer />
    </div>
  );
}

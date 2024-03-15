import React from 'react';
import './Dashboard.css'; 
import { Link } from 'react-router-dom'; 

function Dashboard() {
  
  const totalProducts = 10;
  const totalOrders = 4;

  return (
    <div className="container">
      <h2 className="title">Simplified ERP System With React</h2>
      <div className="metricsContainer">
        <div className="metric products"> {}
          <Link to="/product">
            <h3>Total Products</h3>
            <p>{totalProducts}</p>
          </Link>
        </div>
        <div className="metric orders"> {}
          <Link to="/order">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </Link>
        </div>
        <div className="metric calendar"> {}
          <Link to="/calendar">
            <h3>Calendar View</h3>
            <p>Go to Calendar</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

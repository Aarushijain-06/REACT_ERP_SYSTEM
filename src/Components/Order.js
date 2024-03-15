import React, { useState } from 'react';
import './Order.css';

const initialOrders = [
  { id: 1, orderId: 'ORDER1', customerName: 'Rishi Gupta', orderDate: '2024-03-10', status: 'Processing' },
  { id: 2, orderId: 'ORDER2', customerName: 'Pranav Jain', orderDate: '2024-03-12', status: 'Pending' },
  { id: 3, orderId: 'ORDER3', customerName: 'Aarushi Jain', orderDate: '2024-03-09', status: 'Processing' },
  { id: 4, orderId: 'ORDER4', customerName: 'Deepak Mishra', orderDate: '2024-03-08', status: 'Delivered' }
];

function Order() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState('');

  const generateRandomDate = () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (!date) {
      setSelectedOrders(orders);
      setSelectedDeliveryStatus('');
      return;
    }

    setSelectedOrders([]);
    setSelectedDeliveryStatus('In Progress');

    setSelectedOrders(orders.filter(order => {
      const shippingDate = generateRandomDate();
      const expectedDeliveryDate = new Date(shippingDate);
      expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + Math.floor(Math.random() * 10) + 1);
      
      return (
        expectedDeliveryDate.getDate() === date.getDate() &&
        expectedDeliveryDate.getMonth() === date.getMonth() &&
        expectedDeliveryDate.getFullYear() === date.getFullYear()
      );
    }));
  };

  const handleViewOrderDetails = (order) => {
    const shippingDate = generateRandomDate();
    const expectedDeliveryDate = new Date(shippingDate);
    expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + Math.floor(Math.random() * 10) + 1);

    setSelectedOrder({
      ...order,
      shippingDate: shippingDate,
      expectedDeliveryDate: expectedDeliveryDate
    });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.orderId !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div className="order-container">
      <div className="order-content">
        <h2 className="order-heading">Orders Management</h2>
        {selectedOrder && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
            <p><strong>Order Date:</strong> {selectedOrder.orderDate}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Shipping Date:</strong> {selectedOrder.shippingDate?.toDateString()}</p>
            <p><strong>Expected Delivery Date:</strong> {selectedOrder.expectedDeliveryDate?.toDateString()}</p>
            <button onClick={() => setSelectedOrder(null)} className="close-details-button">Close Details</button>
          </div>
        )}
        <div className="order-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Customer Name:</strong> {order.customerName}</p>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button onClick={() => handleViewOrderDetails(order)} className="view-details-button">View Details</button>
              <button onClick={() => handleUpdateOrderStatus(order.orderId, 'Shipped')} className="update-status-button">Ship</button>
              <button onClick={() => handleDeleteOrder(order.orderId)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;

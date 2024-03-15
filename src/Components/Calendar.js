import React, { useState } from 'react';
import './Calendar.css';
import ReactCalendar from 'react-calendar'; 
import 'react-calendar/dist/Calendar.css'; 

const initialOrders = [
  { id: 1, orderId: 'ORDER1', customerName: 'Rishi Gupta', orderDate: '2024-03-10', status: 'Processing' },
  { id: 2, orderId: 'ORDER2', customerName: 'Pranav Jain', orderDate: '2024-03-12', status: 'Pending' },
  { id: 3, orderId: 'ORDER3', customerName: 'Aarushi Jain', orderDate: '2024-03-09', status: 'Processing' },
  { id: 4, orderId: 'ORDER4', customersName: 'Deepak Mishra', orderDate: '2024-03-08', status: 'Delivered' }
];

function CalendarComponent() {
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
      const expectedDeliveryDate = new Date(order.expectedDeliveryDate);
      return (
        expectedDeliveryDate.getDate() === date.getDate() &&
        expectedDeliveryDate.getMonth() === date.getMonth() &&
        expectedDeliveryDate.getFullYear() === date.getFullYear()
      );
    }));
  };
  
  const handleViewOrderDetails = (order) => {
    setSelectedOrder({
      ...order,
      shippingDate: generateRandomDate(),
      expectedDeliveryDate: generateRandomDate()
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
    <div className="calendar-container">
      <ReactCalendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      <div className="selected-orders">
        <h3>Orders for {selectedDate.toDateString()}</h3>
        <ul>
          {selectedOrders.map(order => (
            <li key={order.id}>{order.customerName}</li>
          ))}
        </ul>
        {selectedDeliveryStatus && (
          <p><strong>Delivery Status:</strong> {selectedDeliveryStatus}</p>
        )}
      </div>
    </div>
  );
}

export default CalendarComponent;

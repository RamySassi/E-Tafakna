import React, {useState, useEffect} from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import all_orders from '../../constants/orders';
import {calculateRange, sliceData} from '../../utils/table-pagination';

import '../styles.css';

function Users () {
    const [search, setSearch] = useState('');
    const [orders, setOrders] = useState(all_orders);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    const [showAddUserForm, setShowAddUserForm] = useState(false); // State to show/hide form
    const [newUser, setNewUser] = useState({name: '', offer: ''}); // State to handle new user input

    useEffect(() => {
        setPagination(calculateRange(all_orders, 5));
        setOrders(sliceData(all_orders, page, 5));
    }, [page]);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = all_orders.filter((item) =>
                item.first_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                item.last_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                item.product.toLowerCase().includes(event.target.value.toLowerCase())
            );
            setOrders(search_results);
        } else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setOrders(sliceData(all_orders, new_page, 5));
    };

    // Handle "Add New User" Button Click
    const __handleAddUserClick = () => {
        setShowAddUserForm(true); // Show the form when the button is clicked
    };

    // Handle form input changes
    const __handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const __handleSubmit = (event) => {
        event.preventDefault();
        console.log('New user data:', newUser);
        // Logic to add the new user to the orders list or handle API call can go here

        // Reset form and hide it
        setNewUser({name: '', offer: ''});
        setShowAddUserForm(false);
    };

    // Handle cancel action
    const __handleCancel = () => {
        setNewUser({name: '', offer: ''}); // Reset form values
        setShowAddUserForm(false); // Hide form
    };

    return(
        <div className='dashboard-content'>
            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Orders List</h2>
                    <div className='dashboard-content-actions'>
                        <div className='dashboard-content-search'>
                            <input
                                type='text'
                                value={search}
                                placeholder='Search..'
                                className='dashboard-content-input'
                                onChange={e => __handleSearch(e)} />
                        </div>
                        <button 
                            className='add-user-btn' 
                            onClick={__handleAddUserClick}>
                            Add New User
                        </button>
                    </div>
                </div>

                {/* Conditionally render the Add User form */}
                {showAddUserForm && (
                    <form className='add-user-form' onSubmit={__handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input 
                                type='text' 
                                id='name' 
                                name='name' 
                                value={newUser.name} 
                                onChange={__handleInputChange} 
                                placeholder='Enter name' 
                                required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='offer'>Offres </label>
                            <input 
                                type='text' 
                                id='offer' 
                                name='offer' 
                                value={newUser.offer} 
                                onChange={__handleInputChange} 
                                placeholder='Enter offer' 
                                required />
                        </div>
                        <div className='form-actions'>
                            <button type='submit' className='submit-btn'>Add User</button>
                            <button type='button' className='cancel-btn' onClick={__handleCancel}>Cancel</button>
                        </div>
                    </form>
                )}

<table>
                    <thead>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>COSTUMER</th>
                        <th>PRODUCT</th>
                    </thead>

                    {orders.length !== 0 ?
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td><span>{order.id}</span></td>
                                    <td><span>{order.date}</span></td>
                                   
                                    <td>
                                        <div>
                                            <img 
                                                src={order.avatar}
                                                className='dashboard-content-avatar'
                                                alt={order.first_name + ' ' +order.last_name} />
                                            <span>{order.first_name} {order.last_name}</span>
                                        </div>
                                    </td>
                                    <td><span>{order.product}</span></td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {orders.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    );
}

export default Users;

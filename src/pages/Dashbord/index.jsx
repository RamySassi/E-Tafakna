import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import all_orders from '../../constants/orders'; // Update with your file path
import { FaUserPlus, FaBox } from 'react-icons/fa'; // Example icons from react-icons

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsersLastTwoMonths: 0,
        mostFrequentProduct: '',
        activityData: {
            labels: [],  // Dates
            data: [],     // User counts
        },
    });

    const chartRef = useRef(null);

    useEffect(() => {
        const calculateStats = () => {
            if (!all_orders || all_orders.length === 0) return;

            // Calculate total users
            const totalUsers = all_orders.length;

            // Get the current date and two months ago
            const now = new Date();
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(now.getMonth() - 2);

            // Filter orders from the last 2 months
            const newOrders = all_orders.filter(order => {
                // Convert date to JavaScript Date object
                const [day, month, year] = order.date.split(',')[0].split(' ');
                const orderDate = new Date(`${month} ${day}, ${year}`);
                
                return orderDate >= twoMonthsAgo;
            });

            // Calculate the number of new users in the last 2 months
            const newUsersLastTwoMonths = newOrders.length;

            // Calculate most frequent product
            const productCounts = {};
            all_orders.forEach(order => {
                if (!productCounts[order.product]) {
                    productCounts[order.product] = 0;
                }
                productCounts[order.product]++;
            });

            const mostFrequentProduct = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b);

            // Prepare data for activity chart
            const dateCounts = {};
            all_orders.forEach(order => {
                const date = order.date.split(',')[0]; // Extract the date part
                if (!dateCounts[date]) {
                    dateCounts[date] = 0;
                }
                dateCounts[date]++;
            });

            const sortedDates = Object.keys(dateCounts).sort(); // Sort dates
            const sortedCounts = sortedDates.map(date => dateCounts[date]); // Map counts to sorted dates

            setStats({
                totalUsers,
                newUsersLastTwoMonths,
                mostFrequentProduct,
                activityData: {
                    labels: sortedDates,
                    data: sortedCounts,
                },
            });
        };

        calculateStats();

        // Cleanup function to destroy chart instance if needed
        return () => {
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, []);

    const activityChartData = {
        labels: stats.activityData.labels,
        datasets: [
            {
                label: 'Number of Users per Date',
                data: stats.activityData.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, // Allows you to set a fixed height
        plugins: {
            legend: {
                display: false, // Optionally hide the legend
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    autoSkip: true, // Optionally skip some x-axis labels if they are too crowded
                    maxRotation: 45, // Rotate x-axis labels for better fit
                    minRotation: 45,
                },
            },
        },
    };
    

    return (
        <div className="container p-4">
        <div className="container">
            <main>
                <div className="row mb-4">
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <FaUserPlus size={40} className="text-primary me-3" />
                                    <div>
                                        <h5 className="card-title">Total Users</h5>
                                        <p className="card-text display-4">{stats.totalUsers}</p>
                                        <small className="text-muted">Total number of users registered.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <FaUserPlus size={40} className="text-primary me-3" />
                                    <div>
                                        <h5 className="card-title">New Users Last 2 Months</h5>
                                        <p className="card-text display-4">{stats.newUsersLastTwoMonths}</p>
                                        <small className="text-muted">Number of users  in the last 2 months.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm border-primary">
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <FaBox size={40} className="text-primary me-3" />
                                    <div>
                                        <h5 className="card-title">Most Frequent Offer</h5>
                                        <p className="card-text display-4">{stats.mostFrequentProduct}</p>
                                        <small className="text-muted">Most frequently Offer.</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Number of Users per Date</h5>
                                <div className="chart-container">
    <Line data={activityChartData} options={chartOptions} ref={chartRef} />
</div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="text-center my-4">
                <p>&copy; 2024 Admin Dashboard</p>
            </footer>
        </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../Apis/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import '../CSS/OrderReports.css';

const OrderReports = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosClients.get('/getLatestOrder');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate('/order');
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="card-header py-0 my-0 fw-bold d-flex justify-content-between">
          <h5 style={{fontSize: '1rem'}}>Latest Order</h5>
          <FontAwesomeIcon
            icon={faSyncAlt}
            onClick={fetchData}
            className={`refresh-icon ${loading ? 'spin' : ''}`}
            style={{ cursor: 'pointer', color: '#f2a93e' }}
            title="Refresh"
          />
        </div>
        <div className="card-body">
          <div className="table-responsive theme-scrollbar">
            <table className="table user-table" id="table_id">
              <thead className='border-bottom'>
                <tr>
                  <th style={{fontSize : '0.9rem'}}>Product</th>
                  <th style={{fontSize : '0.9rem'}}>Product Name</th>
                  <th style={{fontSize : '0.9rem'}}>Price</th>
                  <th style={{fontSize : '0.9rem'}}>Order Date</th>
                  <th style={{fontSize : '0.9rem'}}>Customer</th>
                  <th style={{fontSize : '0.9rem'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item) => {
                  
                  const products = JSON.parse(item.product);
                  const firstProduct = products[0];
                  

                  return (
                    <tr key={item.order_id}>
                      <td>
                        <div className="table-image">
                          <img
                            src={JSON.parse(firstProduct?.item?.product_image)[0]}
                            className="img-fluid rounded-circle"
                            alt={firstProduct.product_name}
                          />
                        </div>
                      </td>
                      <td style={{fontSize : '0.8rem'}}>{firstProduct?.item.product_name}</td>
                      <td style={{fontSize : '0.8rem'}}>Rs {Math.floor(item.total_price)}</td>
                      <td style={{fontSize : '0.8rem'}}>{formatDate(item.created_at)}</td>
                      <td style={{fontSize : '0.8rem'}}>{item.first_name || 'Customer Name'} {item.last_name || 'Customer Name'}</td>
                      <td style={{fontSize : '0.8rem'}}>
                        <span className={`badge ${item.order_status === 'Pending' ? 'bg-primary' : item.order_status === 'Completed' ? 'bg-success' : 'bg-danger'}`}>
                          {item.order_status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Optional button to view all */}
        {/* <div className='text-center'>
          <button className='btn btn-primary' onClick={handleButtonClick}>View All</button>
        </div> */}
      </div>
    </div>
  );
};

export default OrderReports;

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip, // Import Tooltip
  Legend // Import Legend if using it
} from 'chart.js';

// Register the components you need
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartComponent = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

    datasets: [
      {
        label: '',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Make sure tooltips are enabled
        mode: 'nearest', // You can set this to 'index' or 'nearest' based on your need
        intersect: false, // `false` makes sure that the tooltip shows even when hovering near the line
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat().format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
        border: {
          display: false, // Remove x-axis border line
        },
        ticks: {
          display: false // Hide x-axis labels
        }
      },
      y: {
        grid: {
          display: false, // Remove y-axis grid lines
        },
        border: {
          display: false, // Remove y-axis border line
        },
        ticks: {
          display: false // Optionally, you can also hide the y-axis tick labels
        }
      },
    },
    hover: {
      mode: 'index',
      intersect: false,
    }
  };
  
  
  
  return(
     <div className="col-xxl-4 col-sm-6">
      <div className="card widgets-card">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-lg-5 d-flex d-lg-block justify-content-between align-items-center">
              <h5 className='fw-bold'>Total Profit</h5>
              <h5>$254.90</h5>
            </div>
            <div className="col-lg-7 col-12 p-0">
            <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;

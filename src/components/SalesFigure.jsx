import React, { useEffect, useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../CSS/OrderReports.css'  // We'll add custom CSS here
import { FaHeart } from 'react-icons/fa'
import { Card, Row, Col, Button } from 'react-bootstrap';  // Import Bootstrap components
import { apiGet } from '../Api/apiMethods'

const SalesFigure = () => {
  const [product, setProduct] = useState('')
  const [order, setOrder] = useState('')
  const [user, setUser] = useState('')

  const fetchProductCount = async () => {
    try {
      const response = await apiGet('/getProductCount')
      setProduct(response.data.count)
    } catch (error) {
      console.log('error', error)
    }
  }

  const fetchOrderCount = async () => {
    try {
      const response = await apiGet('/getOrderCount')
      setOrder(response.data.count)
    } catch (error) {
      console.log('error', error)
    }
  }

  const fetchUserCount = async () => {
    try {
      const response = await apiGet('/getUserCount')
      setUser(response.data.count)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchProductCount()
    fetchOrderCount()
    fetchUserCount()
  }, [])

  const totalProducts = product
  const totalOrders = order
  const totalCustomers = user
  const maxProducts = 100
  const maxOrders = 150
  const maxCustomers = 100

  return (
    <div className="container">
      <Row className="justify-content-center">
        <Col md={4} className="mb-4">
          <Card className="shadow-lg custom-card text-center">
            <Card.Body>
              <CircularProgressbar
                value={(totalProducts / maxProducts) * 100}
                text={`${totalProducts}`}
                styles={{
                  path: { stroke: `rgba(75,192,192,1)`, transition: 'stroke-dashoffset 0.5s ease 0s' },
                  text: { fill: '#000', fontSize: '24px', fontWeight: 'bold' },
                  trail: { stroke: '#d6d6d6' }
                }}
              />
              <p className="mt-3">Total Products</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-lg custom-card text-center">
            <Card.Body>
              <CircularProgressbar
                value={(totalOrders / maxOrders) * 100}
                text={`${totalOrders}`}
                styles={{
                  path: { stroke: `rgba(255,99,132,1)`, transition: 'stroke-dashoffset 0.5s ease 0s' },
                  text: { fill: '#000', fontSize: '24px', fontWeight: 'bold' },
                  trail: { stroke: '#d6d6d6' }
                }}
              />
              <p className="mt-3">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="shadow-lg custom-card text-center">
            <Card.Body>
              <CircularProgressbar
                value={(totalCustomers / maxCustomers) * 100}
                text={`${totalCustomers}`}
                styles={{
                  path: { stroke: `rgba(255,206,86,1)`, transition: 'stroke-dashoffset 0.5s ease 0s' },
                  text: { fill: '#000', fontSize: '24px', fontWeight: 'bold' },
                  trail: { stroke: '#d6d6d6' }
                }}
              />
              <p className="mt-3">Total Customers</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SalesFigure

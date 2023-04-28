import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Common/Button';
import { Row, Col } from 'reactstrap';

function Payment() {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orders, setOrders] = useState([]);


  const url = 'http://35.154.163.7:3000/api';

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${url}/payres`);
        if (isMounted) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadRazorpay = async (paymentType) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onerror = () => {
      alert('Razorpay SDK failed to load. Are you online?');
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(`${url}/createorder`, {
          amount: orderAmount,
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${url}/getrazorpaykey`);

        const options = {
          key: razorpayKey,
          amount: orderAmount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(`${url}/payorder`, {
              amount: orderAmount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            console.log(response);
            alert(result.data.msg);
            fetchOrders();
          },
          prefill: {
            name: 'SSP Trends',
            email: 'ssptrends@gmail.com',
            contact: '+91 9445460403',
          },
          notes: {
            address: 'example address',
          },
          theme: {
            color: '#00AB55',
          },

          netbanking: {
            hide: true,
          },
          wallet: {
            hide: true
          },
        };

        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

        // If UPI payment option is selected
        if (paymentType === 'upi') {
          // Open the UPI payment gateway
          // ...
        }
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  };

  return (
    <div className="App">
      <Row>

        <div>
          <Col>
            <h2> Pay Order</h2>
            <label>
              Amount:{' '}
              <h1>{orderAmount}</h1>

            </label>
          </Col>
          <Col>
            <Button
              disabled={loading}
              variant='primary'
              text='Card'
              onClick={() => loadRazorpay('card')} // change function name here
            />
            <Button
              disabled={loading}
              variant='primary'
              text='UPI'
              onClick={() => loadRazorpay('upi')} // change function name here
            />
          </Col>


          {loading && <div>Loading...</div>}


        </div>
      </Row>
    </div>
  );
}

export default Payment;

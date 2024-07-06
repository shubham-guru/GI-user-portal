import React, { Suspense } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import { dummyOrders } from '../../data/dummy/orders';

const OrderBox = React.lazy(() => import("../hocs/OrderBox/OrderBox"));

const Orders = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const userName = user?.firstName + " " + user?.lastName; // Getting User name

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        Namaste, {userName?.toLocaleUpperCase()}
      </Col>
      {
        dummyOrders.map((order, index: number) => {
          return (
            <Col span={6} style={{margin: ""}}>
              <Suspense fallback="" key={index}>
                <OrderBox text={order.id} link={order.link} />
              </Suspense>
            </Col>
          )
        })
      }
      <Col span={6}>
      <Tooltip title="Add New Order">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          border: '1px dashed #d9d9d9',
          borderRadius: '.2cqmax',
          fontSize: '2cqmax',
          cursor: 'pointer'
        }}>
          +
        </div>
        </Tooltip>
      </Col>

    </Row>
  )
}

export default Orders
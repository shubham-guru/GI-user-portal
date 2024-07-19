import React, { Suspense, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import { dummyOrders } from '../../data/dummy/orders';

const OrderBox = React.lazy(() => import("../hocs/OrderBox/OrderBox"));
const AddOrders = React.lazy(() => import("./AddOrders"));

const Orders = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const userName = user?.firstName + " " + user?.lastName; // Getting User name
  const [showModal, setShowModal] = useState<boolean>(false);


  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        Namaste, {userName?.toLocaleUpperCase()}
      </Col>
      {
        dummyOrders.map((order, index: number) => {
          return (
            <Col span={6} key={index}>
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
          }} onClick={() => setShowModal(true)}>
            +
          </div>
        </Tooltip>
      </Col>
      {
        showModal ? <Suspense fallback=""><AddOrders isOpen={showModal} onCancel={(value: boolean) => setShowModal(value)} /> </Suspense> : null
      }
    </Row>
  )
}

export default Orders
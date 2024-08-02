import React, { Suspense, useEffect, useState } from 'react'
import { Col, Row, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { Alert } from '../hocs/Alert/Alert';
import Loader from '../hocs/Loader/Loader';
import { saveUserOrders } from '../../redux/slice/userOrders';

const OrderBox = React.lazy(() => import("../hocs/OrderBox/OrderBox"));
const AddOrders = React.lazy(() => import("./AddOrders"));

const Orders = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const orders = useSelector((state: { userOrders : { orders: string[] } }) => state.userOrders.orders);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allOrders, setAllOrders] = useState<Array<string>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(orders?.length === 0) {
      getAllOrders();
    } else {
      setAllOrders(orders)
    }
  }, [])

  const getAllOrders = async () => {
    setLoading(true);
    await Query(HttpMethods.GET, apiRoutes.GET_ORDERS, {}, user?.token).then((res) => {
      if (res?.status === 200) {
        setAllOrders(res?.data?.data);
        dispatch(saveUserOrders(res?.data?.data));
        setLoading(false);
      } else {
        Alert("error", res?.data?.message);
        setLoading(false);
      }
    })
  }

  return (
    <Row gutter={[20, 20]}>
      {
        loading ? (
          <Loader text="Getting all your Orders !" />
        ) : (
          <>
            {allOrders?.map((order: any, index: number) => {
              return (
                <Col span={6} key={index}>
                  <Suspense fallback="" key={index}>
                    <OrderBox orderId={"GI-" + order?.ORDER_ID} orderType={order.ORDER_TYPE} paymentStatus={order.IS_PAID} createdOn={order.CREATEDAT} />
                  </Suspense>
                </Col>
              );
            })}
            <Col span={6}>
              <Tooltip title="Add New Order">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    border: '1px dashed #d9d9d9',
                    borderRadius: '.2cqmax',
                    fontSize: '2cqmax',
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowModal(true)}
                >
                  +
                </div>
              </Tooltip>
            </Col>
          </>
        )
      }



      {
        showModal ? <Suspense fallback=""><AddOrders isOpen={showModal} onCancel={(value: boolean) => setShowModal(value)} /> </Suspense> : null
      }
    </Row>
  )
}

export default Orders
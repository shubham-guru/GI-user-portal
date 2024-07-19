import React, { Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import { useNavigate } from 'react-router-dom';
import { Col, Flex, Typography } from 'antd';
import { routes } from '../../domain/constants/routes';

import "./styles/agreement.css"
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { Alert } from '../hocs/Alert/Alert';

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));

const Agreement = () => {
  const { Text, Title } = Typography;

  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);

  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const userName = user?.firstName + " " + user?.lastName; // Getting User name

  const handleAgreement = async () => {
    setLoading(true);

      await Query(HttpMethods.PUT, apiRoutes.CREATE_USER, {}, user.token).then((res) => {
        if(res?.status === 200) {
          navigate(routes.DASHBOARD)
        }
        setLoading(false);
      }).catch((err) => {
        setLoading(false);
        Alert("error", err)
        console.log("🚀 ~ awaitQuery ~ err:", err)
      })
  }

  return (
    <Flex className="agreement-flex" vertical>
      <Col span={20} className="agreement-col">
        <Title>Welcome, {userName?.toLocaleUpperCase()}</Title>
        <Text type="secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
        </Text>
      </Col>

      <Col span={20} className="agreement-col">
        <Suspense fallback=""><CustomButton type="primary" size="middle" text="Ok, Proceed to dashboard" loading={loading} onClick={handleAgreement} /></Suspense>
      </Col>
    </Flex>
  )
}

export default Agreement
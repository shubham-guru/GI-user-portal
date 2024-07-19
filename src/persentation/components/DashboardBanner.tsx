import { Card, Col, Row } from 'antd'
import { dashboardChipsData } from '../../domain/constants/dashboardChipsData'
import Meta from 'antd/es/card/Meta'
import CustomButton from '../hocs/Button/CustomButton';
import { useNavigate } from 'react-router-dom';

const DashboardBanner = () => {
  const navigate = useNavigate();
  return (
    <Row gutter={[20, 20]}>
      {
        dashboardChipsData.map((item, index) => {
          return (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt="card_image"
                    src={item.image}
                  />
                }
              >
                <Meta
                  title={item.priText}
                  description={item.secText}
                />
                <CustomButton text={item.btnText} type="primary" size="small" onClick={() => navigate(item.href)} />
              </Card>
            </Col>
          )
        })
      }
    </Row>
  )
}

export default DashboardBanner
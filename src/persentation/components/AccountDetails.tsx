import { Col, Row, Image, Typography } from "antd"
import { useSelector } from "react-redux";
import { UserData } from "../../domain/interfaces/UserData";

const AccountDetails = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const { Text } = Typography;
  console.log("user--->", user)
  
  return (
    <Row>
      <Col>
        <Image src={user.image} alt="user-img" preview={false} />
        <Text>{user?.firstName + " " + user?.lastName}</Text>
      </Col>
    </Row>
  )
}

export default AccountDetails
import { Col, Row, Image, Typography, Divider, Tag, Flex, Card, List } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../domain/interfaces/UserData";
import { useEffect, useState } from "react";
import { Query } from "../../data/ApiQueries/Query";
import { HttpMethods } from "../../domain/constants/httpMethods";
import { apiRoutes } from "../../data/routes/apiRoutes";
import { Alert } from "../hocs/Alert/Alert";
import { updateUserInfo } from "../../redux/slice/userDataSlice";
import avatar from "../../assets/Male Avatar.gif";

import "./styles/accountDetails.css"
import CustomButton from "../hocs/Button/CustomButton";
import { fetchAddresses } from "../../data/helpers/getAddresses";
import { setUserAddresses } from "../../redux/slice/addressSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CustomInputs from "../hocs/InputFileds/CustomInputs";

const AccountDetails = () => {
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const userAddresses = useSelector((state: { address: { addresses: [] } }) => state.address.addresses);
  const dispatch = useDispatch();
  const { Text, Link } = Typography;

  const [individualKycInfo, setIndividualKycInfo] = useState<{[key: string]: string}>({
    aadharCard: "",
    panCard: ""
  })

  const [companyKycInfo, setCompanyKycInfo] = useState<{[key: string]: string}>({
    gst: "",
    iec: ""
  })
console.log(user)
  useEffect(() => {
    if (!user?.userId) {
      getUserInfo();
    }
    if(userAddresses?.length === 0) {
      getAddresses();
    }
  }, [])

  const date = new Date(user?.createdAt ? user?.createdAt : "");

  const getUserInfo = async () => {
    await Query(HttpMethods.GET, apiRoutes.GET_USER_INFO, {}, user?.token).then((res) => {
      if (res?.status === 200) {
        dispatch(updateUserInfo(res?.data?.data[0]))
      } else {
        Alert("error", res?.message)
      }
    })
  }

  const getAddresses = async () => {
    const addresses = await fetchAddresses(user?.token);
    if(addresses) {
        dispatch(setUserAddresses(addresses));
    }
};

  return (
    <div>
      <Row className="account-details-row">

        <Col span={user?.verifiedEmail ? 12 : 14} className="account-details-col">
          <Image src={user?.image ? user?.image : avatar} alt="user-img" preview={false} style={{ borderRadius: "100px", border: "solid 1px #888", padding: "0.2cqmax", cursor: "pointer" }} width={160} />
          <Flex vertical style={{ marginLeft: "1cqmax" }}>
            <Text className="acc-det-text">{user?.firstName + " " + user?.lastName}</Text>
            <Flex align="center">
              <Text className="acc-det-text acc-det-email">{user?.email}</Text>
              <Tag color={user?.verifiedEmail ? "green" : "yellow"}>{user?.verifiedEmail ? "Verified" : "Not Verified"}</Tag>
              { user?.verifiedEmail === false ? <CustomButton type="link" text="Send OTP" onClick={() => {}} size="small" /> : null}
            </Flex>
            <Text className="acc-det-text acc-det-userid">{user?.userId}</Text>
          </Flex>
        </Col>

        <Col span={1}>
          <Divider type="vertical" style={{ height: "15cqmax" }} />
        </Col>

        <Col span={user?.verifiedEmail ? 11 : 9} className="account-details-col">
          <Flex vertical style={{ marginLeft: "1cqmax" }}>
            <Text className="acc-det-onboarded-text">Onboarded on:</Text>
            <Text>{date.toLocaleString()}</Text>
          </Flex>
        </Col>
      </Row>
      <Divider />

      {/* Pick Address Card */}
      <Card title="Your PickUp Addresses" bordered={false} className="acc-det-card">
        {
              <List
              itemLayout="horizontal"
              dataSource={userAddresses}
              renderItem={(item: {[key: string]: string}) => (
                <List.Item
                  actions={[<EditOutlined style={{ cursor: "pointer", color: "royalblue" }} />, <DeleteOutlined style={{ cursor: "pointer", color: "tomato" }} />]}
                >
                    <List.Item.Meta
                      title={<Text id="user-addresses-text">{item.label}</Text>}
                    />
                </List.Item>
              )}
            />
        }
      </Card>

      {/* Individual KYC Card  */}
      <Card title="Individual KYC" bordered={false} className="acc-det-card">
        <Flex align="center" justify="space-between">
         { !user?.individualKyc ? <Text type="secondary">Kindly complete your Individual KYC to enable all the features of this platform !</Text> : null}
          <Tag color={user?.individualKyc ? "green" : "red"}>{user?.individualKyc ? "Individual KYC Completed" : "Individual KYC not Completed"}</Tag>
          </Flex>

        <Flex className="acc-det-kyc-flex" align="center" justify="space-around"> 
            <Flex align="center" justify="space-around" vertical className="inner-flex">
              <CustomInputs name="aadharCard" 
                placeholder="XXXX-XXXX-XX23" 
                rules={[{ required: true, message: 'Please enter Aadhar Card No !' }]}
                required
                type="number"
                maxLength={12}
                width={20}
                label="Aadhar Card"
                addonUnit={() => {}}
                size="middle"
                onChange={(e: any) => setIndividualKycInfo({...individualKycInfo, aadharCard: e.value})}
                value={individualKycInfo.aadharCard}
              />
              <CustomButton text="Verify" disabled={individualKycInfo.aadharCard?.length !== 12} size="middle" type="primary" onClick={() => {}} />
            </Flex>

            <Flex align="center" justify="space-around" vertical className="inner-flex">
              <CustomInputs name="panCard" 
                placeholder="XXXXXXXX39" 
                rules={[{ required: true, message: 'Please enter Pan Card No !' }]}
                required
                width={20}
                maxLength={10}
                label="Pan Card"
                addonUnit={() => {}}
                size="middle"
                onChange={(e: any) => setIndividualKycInfo({...individualKycInfo, panCard: e.value})}
                value={individualKycInfo.panCard}
              />
              <CustomButton text="Verify" disabled={individualKycInfo.panCard?.length !== 10} size="middle" type="primary" onClick={() => {}} />
            </Flex>
          </Flex>
      </Card>

        {/* Company KYC Card  */}
        <Card title="Company KYC" bordered={false} className="acc-det-card">
        <Flex align="center" justify="space-between">
         { !user?.companyKyc ? <Text type="secondary">Kindly complete your Company KYC to enable all the features of this platform !</Text> : null}
          <Tag color={user?.companyKyc ? "green" : "red"}>{user?.companyKyc ? "Company KYC Completed" : "Company KYC not Completed"}</Tag>
          </Flex><br /> 
         <Text><Tag color="blue">Please Note:</Tag> International shipping for commercial orders is available only if your Company's KYC (Know Your Customer) is completed. However, you can still send non-commercial orders.</Text>

        <Flex className="acc-det-kyc-flex" align="center" justify="space-around"> 
            <Flex align="center" justify="space-around" vertical className="inner-flex">
              <CustomInputs name="gst" 
                placeholder="XXXX-XXXX-XXXX-493" 
                rules={[{ required: true, message: 'Please enter GSTIN No !' }]}
                required
                maxLength={15}
                width={20}
                label="GSTIN"
                addonUnit={() => {}}
                size="middle"
                onChange={(e: any) => setCompanyKycInfo({...companyKycInfo, gst: e.value})}
                value={companyKycInfo.gst}
              />
              <CustomButton text="Verify" disabled={companyKycInfo.gst?.length !== 15} size="middle" type="primary" onClick={() => {}} />
              
              <Text>Don't have GSTIN ? <Link> Apply here </Link></Text>
            </Flex>

            <Flex align="center" justify="space-around" vertical className="inner-flex">
              <CustomInputs name="iec" 
                placeholder="XXXXXXXX39" 
                rules={[{ required: true, message: 'Please enter ICE Code !' }]}
                required
                width={20}
                maxLength={10}
                label="IEC Code"
                addonUnit={() => {}}
                size="middle"
                onChange={(e: any) => setCompanyKycInfo({...companyKycInfo, iec: e.value})}
                value={companyKycInfo.iec}
              />
              <CustomButton text="Verify" disabled={companyKycInfo.iec?.length !== 10} size="middle" type="primary" onClick={() => {}} />

              <Text>Don't have IEC Code ? <Link> Apply here </Link></Text>
            </Flex>
          </Flex>
      </Card>
    </div>
  )
}

export default AccountDetails
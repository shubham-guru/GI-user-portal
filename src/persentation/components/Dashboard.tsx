import { Suspense, useEffect, useState } from 'react';
import { Checkbox, Col, Flex, Form, Row, Typography } from 'antd'

import CustomButton from '../hocs/Button/CustomButton';

import axios from 'axios';
import { Alert } from '../hocs/Alert/Alert';
import CustomInputs from '../hocs/InputFileds/CustomInputs';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import DashboardBanner from './DashboardBanner';
import { updateAddress } from '../../redux/slice/userDataSlice';

import "./styles/dashboard.css";

const Dashboard = () => {
  const { Text } = Typography;
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
  const [defaultAdd, setDefaultAdd] = useState<boolean>(false);

  const [addressDetails, setAddressDetails] = useState<{[key: string]: string }>({
    companyName: "",
    completeAddress: "",
    pinCode: "",
    city: "",
    state: "",
    country: ""
  })

  const handleAddress = async (e: { value: string; placeholder: string}, ele: string) => {
    setAddressDetails({ ...addressDetails, [ele]: e.value })
    if(e.placeholder === "PIN CODE" && e.value.length === 6){
        const url = "https://api.postalpincode.in/pincode/";
        try {
          const response = await axios.get(`${url}/${e.value}`);
  
          if (response?.data[0]?.Status === "Success") {
            Alert("success", "Pin Code Found");
  
            const { District, State, Country } = response?.data[0]?.PostOffice[0];
  
            setAddressDetails(prevDetails => ({
              ...prevDetails,
              city: District,
              state: State,
              country: Country,
            }));
          } else {
            Alert("error", response?.data[0]?.Message);
          }
        } catch (error) {
          console.error("Error fetching pin code details:", error);
          Alert("error", "Failed to fetch pin code details");
        }
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      companyName: addressDetails.companyName,
      completeAddress: addressDetails.completeAddress,
      pinCode: addressDetails.pinCode,
      city: addressDetails.city,
      state: addressDetails.state,
      country: addressDetails.country
    });
  }, [addressDetails, form]);

  const saveAddress = async () => {
    const body = {
      companyName: addressDetails.companyName,
      completeAddress: addressDetails.completeAddress,
      pinCode: addressDetails.pinCode,
      city: addressDetails.city,
      state: addressDetails.state,
      country: addressDetails.country,
      isDefault: defaultAdd
    }
    await Query(HttpMethods.POST, apiRoutes.SAVE_ADDRESS, body, user?.token).then((res) => {
      if(res?.status === 200){
        const addressId = res?.data?.address[0][0].USER_ADDRESS_ID;
        Alert("success", res?.data?.message);
        dispatch(updateAddress(addressId))
      } else {
        Alert("error", res?.data?.message);
      }
    })
  }
  return (
    <Row>
      {
        !user?.address ?
          <>
            <Text className="dashboard-pick-add-text">Enter Primary Pick Address</Text>
            <Flex className="dashboard-flex">

              {/* Address Information Form */}
              <fieldset className="dashboard-fieldset">
                <legend>Address Information</legend>
                <Form
                  form={form}
                  name="basic"
                  initialValues={{ addressDetails }}
                  autoComplete="off"
                  layout="vertical"
                >
                  {
                    Object.keys(addressDetails).map((ele: string, index: number) => {
                      const placeholder = ele.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
                      const isReadOnly = (placeholder === "CITY") || (placeholder === "STATE") || (placeholder === "COUNTRY") ? true : false;
                      return (
                        <Suspense fallback=""><CustomInputs
                          key={index}
                          placeholder={placeholder}
                          type={placeholder === "PIN CODE" ? "number" : "text"}
                          name={ele}
                          readonly={isReadOnly}
                          rules={[{ required: true, message: `Please enter ${placeholder.toLowerCase()} !` }]}
                          addonUnit={() => { }}
                          label={placeholder}
                          onChange={(e: any) => handleAddress(e, ele)}
                          value={addressDetails[ele]} /></Suspense>
                      )
                    })
                  }
                  <Checkbox onChange={(e) => setDefaultAdd(e.target.checked)}>Default Pickup Address</Checkbox>

                  {/* Submit Button */}
                  <Form.Item>
                    <CustomButton type="primary" htmlType="submit" size="middle" text="Save" onClick={saveAddress} />
                  </Form.Item>
                </Form>
              </fieldset>

            </Flex>
          </> :
          <Col span={24}>
            <DashboardBanner />
          </Col>
      }

    </Row>
  )
}

export default Dashboard
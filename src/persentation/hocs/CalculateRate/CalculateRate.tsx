import { Col, Flex, Form, FormProps, Typography } from 'antd'
import { Suspense, useRef, useState } from 'react'
import { dimensions, weightUnits } from '../../../domain/constants/units'
import CustomButton from '../Button/CustomButton'
import Heading from '../Heading/Heading'
import CustomInputs from '../InputFileds/CustomInputs'
import { calculateFare } from '../../../data/helpers/CalculateFare'
import { IndexPageFormType, HeavyCargoFormType } from '../../../domain/types/FormTypes'
import useWindowWidth from '../../../data/helpers/InnerWidth'
import Loader from '../Loader/Loader'
import CustomModal from '../Modal/CustomModal'

const CalculateRate = () => {
    const targetFareRef = useRef<HTMLDivElement>(null);
    const { Text } = Typography
    const [unit, setUnit] = useState<string | undefined>("");
    const [fare, setFare] = useState<number>(0);
    const [isCalculating, setIsCalculating] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [calculateData, setCalculateData] = useState({
        totalWeight: 0,
        length: 0,
        breadth: 0,
        height: 0
    });

    // Getting inner width of the browser
    const windowWidth = useWindowWidth();

    const handleOk = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish: FormProps<IndexPageFormType>['onFinish'] = () => {
        // Converting Grams into Kg and calculating fare
        if (!unit || unit === weightUnits[0]) {
            setFare(calculateFare(calculateData.totalWeight * 0.001))
        } else if (unit === weightUnits[1]) {
            setFare(calculateFare(calculateData.totalWeight));
        }

        const lengthConversions: { [key: string]: number } = {
            [dimensions[1]]: 100,
            [dimensions[2]]: 30.48,
            [dimensions[3]]: 2.54,
        };

        if (unit && unit in lengthConversions) {
            const conversionFactor = lengthConversions[unit];
            setCalculateData({
                ...calculateData,
                length: calculateData.length * conversionFactor,
                breadth: calculateData.breadth * conversionFactor,
                height: calculateData.height * conversionFactor,
            });
        }

        if (windowWidth <= 425) {
            handleOk();
        }
        setIsCalculating(true);
        setTimeout(() => {
            setIsCalculating(false);
        }, 5000); // 5 seconds
    };

    const onFinishFailed: FormProps<IndexPageFormType | HeavyCargoFormType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleFormData = (e: any) => {
        switch (e.placeholder) {
            case "Total Weight":
                setCalculateData({ ...calculateData, totalWeight: parseFloat(e.value) });
                break;
            case "Length":
                setCalculateData({ ...calculateData, length: parseFloat(e.value) })
                break;
            case "Breadth":
                setCalculateData({ ...calculateData, breadth: parseFloat(e.value) })
                break;
            case "Height":
                setCalculateData({ ...calculateData, height: parseFloat(e.value) })
                break;
        }
    }
    // const scrollToCalculator = () => {
    //     if (targetFareRef.current) {
    //         targetFareRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // };

    // Checking if object contains 0
    const isAnyValueZero = (obj: IndexPageFormType) => {
        return Object.values(obj).some(value => value === 0);
    };



    return (
        <Col span={24} className="index-col" ref={targetFareRef}>
            <Suspense fallback=""><Heading text="Get Instant Rates" /></Suspense>
            {!isCalculating ? <Flex align="center" style={{ padding: "2cqmax" }}>
                <Col xs={24} md={14} lg={12} className="form-col">
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        {/* Weight Field */}
                        <Suspense fallback=""><CustomInputs placeholder="Total Weight"
                            type="number"
                            name="totalWeight"
                            addonAfter={weightUnits}
                            rules={[{ required: true, message: 'Please enter total weight !' }]}
                            addonUnit={(value: string) => setUnit(value)}
                            onChange={(e: EventTarget) => handleFormData(e)}
                            value={calculateData.totalWeight} /></Suspense>

                        {/* Length Field */}
                        <Suspense fallback=""><CustomInputs placeholder="Length" type="number"
                            name="length"
                            addonAfter={dimensions}
                            addonUnit={(value: string) => setUnit(value)}
                            rules={[{ required: true, message: 'Please enter length !' }]}
                            onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.length} /></Suspense>

                        {/* Breadth Filed */}
                        <Suspense fallback=""><CustomInputs placeholder="Breadth" type="number"
                            addonAfter={dimensions}
                            name="breadth"
                            rules={[{ required: true, message: 'Please enter breadth !' }]}
                            addonUnit={(value: string) => setUnit(value)}
                            onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.breadth} /></Suspense>

                        {/* Height Field */}
                        <Suspense fallback=""><CustomInputs placeholder="Height" type="number"
                            addonAfter={dimensions}
                            name="height"
                            rules={[{ required: true, message: 'Please enter height !' }]}
                            addonUnit={(value: string) => setUnit(value)}
                            onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.height} /></Suspense>

                        {/* Submit Button */}
                        <Form.Item>
                            <Suspense fallback=""><CustomButton type="primary" htmlType="submit" disabled={isAnyValueZero(calculateData)} size="middle" text="Calculate" onClick={() => { }} /></Suspense>
                        </Form.Item>

                    </Form>
                </Col>

                <Col xs={0} md={10} lg={12}>
                    <Text className="calculate-rate-text">
                        *Lighest Fare : <br /> <span id="rate-fare-span">&#x20b9; {fare.toFixed(1)}/- </span>
                    </Text>
                </Col>

                <Suspense fallback="">
                    <CustomModal title="Total Fare" isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} children={
                        <Text className="calculate-rate-text">
                            *Lighest Fare : <br /> <span id="rate-fare-span">&#x20b9; {fare.toFixed(1)}/-</span>
                        </Text>} />
                </Suspense>

            </Flex> : <Suspense fallback=""><Loader text="Calculating Best Fare for you !" /></Suspense>}
        </Col>
    )
}

export default CalculateRate
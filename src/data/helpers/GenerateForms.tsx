// import { Col, Form, Row } from 'antd'
// import React, { Suspense } from 'react'
// import CustomInputs from '../../persentation/hocs/InputFileds/CustomInputs'

// type IGenerateForms = {
//     state: {[key: string]: string | number},
//     setterFunction: (newState: {[key: string]: string | number}) => void,
//     itemsInRow?: number
// }
// const GenerateForms: React.FC<IGenerateForms> = ({ state, setterFunction, itemsInRow }) => {

//     const handleSetterFunction = (ele: string, e: any) => {
//         setterFunction({...state, [ele]: e.value});
//     }

//   return (
//     <Row>
//         <Col xs={24} md={14} lg={12}>
//         <Form
//               name="basic"
//               initialValues={{ remember: true }}
//               autoComplete="off"
//             >
//             {
//                 Object.keys(state).map((key: string, index: number) => {
//                     const placeholder = key.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
//                     const isRequired = [""].includes(key);
//                     const type = placeholder === "EMAIL" ? "email" : (placeholder === "PHONE") || (placeholder === "ALTERNATE PHONE") || (placeholder === "PIN CODE") ? "number" : "text"
//                     const readOnly = [""].includes(key);
//                     return(
//                     <Suspense fallback=""><CustomInputs placeholder="Total Weight"
//                         type={type}
//                         name={key}
//                         addonAfter={weightUnits}
//                         rules={[{ required: true, message: 'Please enter total weight !' }]}
//                         addonUnit={(value: string) => setUnit(value)}
//                         onChange={(e: EventTarget) => handleSetterFunction(key, e)}
//                         value={state[key]} /></Suspense>
//                     )
//                 })
//             }
//             </Form>
//         </Col>
//     </Row>
//   )
// }

// export default GenerateForms
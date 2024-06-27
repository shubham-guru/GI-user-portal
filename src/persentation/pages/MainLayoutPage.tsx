import React, { ReactNode } from 'react'
import { Col, Row } from 'antd'

type IMainLayoutPage = {
    children: ReactNode
}
const MainLayoutPage: React.FC<IMainLayoutPage> = ({ children }) => {
    return (
        <Row>
            <Col span={24}>
                {children}
            </Col>
        </Row>
    )
}

export default MainLayoutPage
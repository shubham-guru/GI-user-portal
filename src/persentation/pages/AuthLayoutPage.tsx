import React, { ReactNode } from 'react'
import { Row, Col } from "antd"

type IAuthLayoutPage = {
  children: ReactNode
}

const AuthLayoutPage: React.FC<IAuthLayoutPage> = ({ children }) => {
  return (
      <Row>
          <Col span={24}>
              {children}
          </Col>
      </Row>
  )
}

export default AuthLayoutPage
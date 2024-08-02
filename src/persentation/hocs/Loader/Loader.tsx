import React from 'react';
import { Col, Typography } from 'antd';

const { Text } = Typography;

type ILoader = {
    text: string;
}

const Loader: React.FC<ILoader> = ({ text }) => {
  return (
    <Col span={24} style={{ textAlign: 'center', padding: '20px' }}> 
      <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve" style={{ height: '100px', width: '100px' }}>
        <circle fill="none" stroke="#000" strokeWidth="4" cx="50" cy="50" r="44" style={{ opacity: 1 }} />
        <circle fill="#000" stroke="#fff" strokeWidth="6" cx="8" cy="54" r="10">
          <animateTransform
            attributeName="transform"
            dur="2s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite" />
        </circle>
      </svg>
      <Text style={{ display: 'block', marginTop: '10px', fontSize: "1.2cqmax" }}>{text}</Text>
    </Col>
  );
}

export default Loader;

import React, { useEffect, useState } from 'react'
import { Flex, Typography } from 'antd';

import "./keyValueChips.css"

type IKeyValueChips = {
    customKey: string;
    customValue: string;
    flexDirection?: boolean;
}

const KeyValueChips: React.FC<IKeyValueChips> = ({ customKey, customValue, flexDirection=true }) => {
    const { Text, Link} = Typography;
    const [href, setHref] = useState("");

    useEffect(() => {
        if(customKey === "Email"){
            setHref(`mailto:${customValue}`)
        } else if(customKey === "Phone"){
            setHref(`tel:${customValue}`)
        } else {
            setHref("https://maps.app.goo.gl/xErjkJwKM8kWLVdy5")
        }
    }, []);

  return (
    <Flex vertical={flexDirection} className="key-value-chip-flex">
        <Text className="key-value-chip-text">{customKey}: </Text>
        <Link href={href} className="key-value-chip-text" id="value-text" target='blank' type="secondary">{customValue}</Link>
    </Flex>
  )
}

export default KeyValueChips
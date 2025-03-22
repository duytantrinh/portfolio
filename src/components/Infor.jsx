import {Text} from "@react-three/drei"
import React from "react"

function Infor({children, ...props}) {
  return (
    <Text {...props} fontSize={0.07} color={"#C8EA80"}>
      {children}
    </Text>
  )
}

export default Infor

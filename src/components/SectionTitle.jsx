import {Text3D} from "@react-three/drei"
import React from "react"
import {MeshBasicMaterial} from "three"

function SectionTitle({children, ...props}) {
  return (
    <Text3D font={"fonts/Poppins_Bold.json"} size={0.25} {...props}>
      {children}
      <meshStandardMaterial color="#eaedff" />
    </Text3D>
  )
}

export default SectionTitle

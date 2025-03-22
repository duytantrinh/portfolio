import {useAtom} from "jotai"
import React from "react"
import {projectAtom} from "./Interface"
import {useTexture} from "@react-three/drei"
import {projects} from "../config"

function MonitorScreen({...props}) {
  // 1. call projectAtom from Interface
  const [project] = useAtom(projectAtom)

  // 2. tạo texture
  const projectTexture = useTexture(project.image)

  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[1.14, 0.66]} />
        <meshBasicMaterial map={projectTexture} />
      </mesh>
    </group>
  )
}

export default MonitorScreen

projects.forEach((project) => {
  useTexture.preload(project.image)
})

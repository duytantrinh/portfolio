import {
  Environment,
  MeshReflectorMaterial,
  useCursor,
  useTexture,
} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {useRef, useState} from "react"
import {MathUtils} from "three"
import {degToRad} from "three/src/math/MathUtils.js"
import {nodeprojects} from "../config"
import useMobile from "../hooks/useMobile"

const Project = ({image, ...props}) => {
  const map = useTexture(image)

  const imageRef = useRef()

  const [projectHovered, setProjectHovered] = useState(false)
  useCursor(projectHovered)

  useFrame(() => {
    imageRef.current.scale.x = MathUtils.lerp(
      imageRef.current.scale.x,
      projectHovered ? 1.1 : 1,
      0.05
    )
    imageRef.current.scale.y = MathUtils.lerp(
      imageRef.current.scale.y,
      projectHovered ? 0.5625 + 0.1 : 0.5625,
      0.05
    )
  })
  return (
    <group {...props}>
      <mesh scale-x={1 + 0.2} scale-y={0.5625 + 0.2}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={"black"} />
      </mesh>
      <mesh scale-x={1 + 0.1} scale-y={0.5625 + 0.1} position-z={0.001}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="white" toneMapped={false} />
      </mesh>
      <mesh position-z={0.002} ref={imageRef} scale-x={1} scale-y={0.5625}>
        <planeGeometry />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  )
}

const SLIDING_SPEED = 2

export const Nodeprojects3D = () => {
  const {isMobile, scaleFactor} = useMobile()
  const group = useRef()
  const [curProject, setCurProject] = useState(0)

  useFrame((_, delta) => {
    group.current.position.x = MathUtils.lerp(
      group.current.position.x,
      -curProject * 1.2,
      delta * SLIDING_SPEED
    )
    group.current.position.z = MathUtils.lerp(
      group.current.position.z,
      curProject * 1.2,
      delta * SLIDING_SPEED
    )
  })

  return (
    <>
      <group position-z={isMobile ? -0.5 : -2}>
        <group ref={group}>
          {nodeprojects.map((url, idx) => (
            <Project
              onPointerEnter={() => {
                setCurProject(idx)
              }}
              image={url.image}
              key={idx}
              position-x={idx * 1.2}
              position-z={-idx * 1.2}
              scale={1.2}
              onClick={() => window.open(url.link, "_blank")}
              useCursor="pointer"
              class="cursor-pointer"
            />
          ))}
        </group>
      </group>

      <Environment preset="sunset" />
    </>
  )
}

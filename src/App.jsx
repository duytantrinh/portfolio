import {Canvas} from "@react-three/fiber"
import {Experience} from "./components/Experience"
import {Scroll, ScrollControls} from "@react-three/drei"
import {config} from "./config"
import {MotionConfig} from "framer-motion"
import Interface from "./components/Interface"
import Menu from "./components/Menu"

import {Suspense} from "react"

function App() {
  return (
    <>
      <Canvas camera={{position: [0, 0.5, 5], fov: 42}}>
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        {/* // tạo scroll page for Experience */}
        <ScrollControls
          pages={config.sections.length}
          damping={0.1}
          maxSpeed={0.2}
        >
          <MotionConfig transition={{duration: 0.6}}>
            <group position-y={-1}>
              <Suspense>
                <Experience />
              </Suspense>
            </group>
          </MotionConfig>

          {/* html : must have `html` prop */}
          <Scroll html>
            <MotionConfig transition={{duration: 1}}>
              <Interface />
            </MotionConfig>
          </Scroll>
        </ScrollControls>
      </Canvas>

      <Menu />
    </>
  )
}

export default App

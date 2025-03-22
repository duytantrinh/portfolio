import {
  Center,
  ContactShadows,
  Environment,
  Float,
  MeshReflectorMaterial,
  RoundedBox,
  useScroll,
} from "@react-three/drei"
import * as THREE from "three"
import {motion} from "framer-motion-3d"

import {Avatar} from "./Avatar"
import {MacBookPro} from "./MacBookPro"

import {useEffect, useRef, useState} from "react"
import SectionTitle from "./SectionTitle"
import {useFrame} from "@react-three/fiber"
import {config, nextprojects} from "../config"
import {home} from "../config"

import {BookCase} from "./BookCase"

import {Lamp} from "./Lamp"
import {Monitor} from "./Monitor"
import {ParkBench} from "./ParkBench"
import {Balloon} from "./Balloon"
import {Mailbox} from "./Mailbox"
import {Pigeon} from "./Pigeon"
import MonitorScreen from "./MonitorScreen"
import useMobile from "../hooks/useMobile"

import {atom, useAtom} from "jotai"

import {Planet} from "./Planet"
import {Nodeprojects3D} from "./Nodeprojects3D"

const SECTIONS_DISTANCE = 8

// for next project
export const currentNextProject = atom(nextprojects[0])

export const Experience = () => {
  const {isMobile, scaleFactor} = useMobile()

  // for check section position
  const [section, setSection] = useState(config.sections[0])

  const sceneContainer = useRef()
  const scrollData = useScroll()

  useFrame(() => {
    // for scrolling to each section position
    if (isMobile) {
      // HORIZONTAL for MOBILE
      sceneContainer.current.position.x =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1)
      sceneContainer.current.position.z = 1
    } else {
      // VERTICAL for BIGGER screen
      sceneContainer.current.position.z =
        -scrollData.offset * SECTIONS_DISTANCE * (scrollData.pages - 1)
      sceneContainer.current.position.x = 0
    }

    // show: which section are we in and set name for it?
    setSection(
      config.sections[Math.round(scrollData.offset * (scrollData.pages - 1))]
    )
  })

  // FOR menu moving
  useEffect(() => {
    const handleHashChange = () => {
      const sectionIndex = config.sections.indexOf(
        window.location.hash.replace("#", "")
      )
      if (sectionIndex >= 0) {
        scrollData.el.scrollTo(
          0,
          (sectionIndex / (config.sections.length - 1)) *
            (scrollData.el.scrollHeight - scrollData.el.clientHeight)
        )
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <>
      <Environment preset="sunset" />

      <directionalLight
        intensity={0.5}
        position={[0, 3.5, -3]}
        // position={[0, 0, -8]}
        color="lightyellow"
      />

      <Avatar position-z={0} scale={isMobile ? 0.8 : 1} />
      {/* SHADOWS & FLOOR */}
      <ContactShadows opacity={0.5} scale={[30, 30]} color="#293a9e" />
      <mesh position-y={-0.001} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        {/* <meshStandardMaterial color="#080D27" /> */}
        <MeshReflectorMaterial
          blur={[200, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={0.4}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.6}
        />
      </mesh>

      <motion.group ref={sceneContainer} animate={section}>
        {/* HOME */}
        <motion.group
          position-y={-5}
          variants={{
            home: {
              y: 0,
            },
          }}
        >
          <Float floatIntensity={0.2} speed={2}>
            <Center disableY disableZ>
              <SectionTitle
                size={isMobile ? 0.3 : 0.5}
                position-y={2.2}
                position-z={-3}
                bevelEnabled
                bevelThickness={0.3}
              >
                {home.title}
              </SectionTitle>
            </Center>
          </Float>

          <Float floatIntensity={2} speed={2}>
            <MacBookPro
              position-x={isMobile ? -0.5 : -1}
              position-y={isMobile ? 1 : 0.5}
              position-z={isMobile ? -2 : 0}
              scale={isMobile ? 0.3 : 0.4}
              rotation-y={Math.PI / 4}
            />
          </Float>
        </motion.group>

        {/* CSS + Javascript*/}
        <motion.group
          // moving HORIZONTAL on MOBILE
          position-x={isMobile ? SECTIONS_DISTANCE : 0 * scaleFactor}
          // moving VERTICAL on BIGGER SCREEN
          position-z={isMobile ? -4 : SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            css: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? -0.5 : -2.2}>
            <SectionTitle
              position-z={1.5}
              rotation-y={Math.PI / 5.5}
              size={0.15}
              rotation-z={THREE.MathUtils.degToRad(10)}
            >
              CSS + Javascript
            </SectionTitle>
            <BookCase position-z={-1.5} />
          </group>
        </motion.group>

        {/* REACT */}
        <motion.group
          // moving HORIZONTAL on MOBILE
          position-x={isMobile ? 2 * SECTIONS_DISTANCE : 0}
          // moving VERTICAL on BIGGER SCREEN
          position-z={isMobile ? -3 : 2 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            projects: {
              y: 0,
            },
          }}
        >
          <group position-x={isMobile ? -0.5 : 0.8 * scaleFactor}>
            <SectionTitle
              position-x={0.3}
              position-z={0}
              rotation-y={-Math.PI / 6.5}
            >
              Reactjs
            </SectionTitle>
            <group
              position-x={1}
              position-z={0}
              rotation-y={-Math.PI / 6}
              scale={0.8}
            >
              <MonitorScreen
                position-x={0.06}
                position-z={-0.7}
                position-y={1.74}
                rotation-y={THREE.MathUtils.degToRad(5)}
                rotation-x={THREE.MathUtils.degToRad(-7)}
              />
              <Monitor
                position-y={1}
                position-z={-1}
                rotation-y={-Math.PI / 2}
                scale={0.02}
              />
              <RoundedBox scale-x={2} position-y={0.5} position-z={-1}>
                <meshStandardMaterial color="white" />
              </RoundedBox>
            </group>
          </group>
        </motion.group>

        {/* Nodejs */}
        <motion.group
          // moving HORIZONTAL on MOBILE
          position-x={isMobile ? 3 * SECTIONS_DISTANCE : 0}
          // moving VERTICAL on BIGGER SCREEN
          position-z={isMobile ? -3 : 3 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            nodejs: {
              y: 0.5,
            },
          }}
        >
          <group position-x={isMobile ? -0.5 : 0.5}>
            <Nodeprojects3D />
          </group>
        </motion.group>

        {/* Nexts */}
        <motion.group
          // moving HORIZONTAL on MOBILE
          position-x={isMobile ? 4 * SECTIONS_DISTANCE : 0}
          // moving VERTICAL on BIGGER SCREEN
          position-z={isMobile ? -4 : 4 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            nextjs: {
              y: 0,
            },
          }}
        >
          <SectionTitle
            position-x={isMobile ? -1.1 : -2.2 * scaleFactor}
            position-z={0.6}
            position-y={0.3}
            rotation-y={THREE.MathUtils.degToRad(30)}
          >
            Nextjs
          </SectionTitle>
          <group position-x={-2 * scaleFactor}>
            <Float floatIntensity={1.5} speed={3}>
              <Planet
                position-x={-0.5}
                position-z={-2.5}
                position-y={0.7}
                scale={0.4}
              />
            </Float>
          </group>
        </motion.group>
        {/* CONTACT */}
        <motion.group
          // moving HORIZONTAL on MOBILE
          position-x={isMobile ? 5 * SECTIONS_DISTANCE : 0}
          // moving VERTICAL on BIGGER SCREEN
          position-z={isMobile ? -4 : 5 * SECTIONS_DISTANCE}
          position-y={-5}
          variants={{
            contact: {
              y: 0,
            },
          }}
        >
          <SectionTitle
            position-x={isMobile ? -1.1 : -2.5 * scaleFactor}
            position-z={0.6}
            position-y={0.3}
            rotation-y={THREE.MathUtils.degToRad(30)}
          >
            CONTACTS
          </SectionTitle>

          <Mailbox
            position-x={isMobile ? 1 : 1.5}
            position-y={0.25}
            position-z={0.5}
            rotation-y={Math.PI * 1.25}
            scale={0.25}
          />
        </motion.group>
      </motion.group>
    </>
  )
}

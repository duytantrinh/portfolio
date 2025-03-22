import {useScroll} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import React, {useState} from "react"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

import {motion} from "framer-motion"
import {
  contact,
  cssprojetcs,
  home,
  nextprojects,
  nodeprojects,
  projects,
  skills,
} from "../config"

import {atom, useAtom} from "jotai"
import useMobile from "../hooks/useMobile"
import {currentNextProject} from "./Experience"

// 1. jotai: create atom from jotai - for React roject
export const projectAtom = atom(projects[0])

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 5,
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 3,
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 2,
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1,
  },
}

function Interface() {
  const {isMobile} = useMobile()

  const [hasScrolled, setHasScrolled] = useState(false)

  const scrollData = useScroll()

  // 2. jotai:using atom
  const [_project, setProject] = useAtom(projectAtom)

  // 2. jotai:for nextproject
  const [currentProject, setCurrentProject] = useAtom(currentNextProject)

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % nextprojects.length)
  }

  const previousProject = () => {
    setCurrentProject(
      (currentProject - 1 + nextprojects.length) % nextprojects.length
    )
  }

  useFrame(() => {
    // when scrolling page
    setHasScrolled(scrollData.offset > 0)
  })

  return (
    <div className="interface">
      <div className="sections">
        {/* HOME */}

        <section className="section section-right  mobile_section_right mobile_section_bottom">
          <motion.div
            className="home-info"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: hasScrolled ? 0 : 1,
            }}
          >
            <motion.div
              initial={{
                translateY: 0,
              }}
              animate={{
                translateY: 4,
              }}
              transition={{
                duration: 0.4,
                repeatDelay: 0.5,
                repeatType: "reverse",
                repeat: Infinity,
              }}
            >
              <div className="home-description">{home.intro}</div>
              <div className="home_skills scrollbar_responsive">
                {skills.map((skill, idx) => (
                  <div
                    className="home_skill_level  button_background"
                    key={skill.name}
                  >
                    <h2 className="home_skill_label_name">{skill.name}</h2>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
        {/* CSS */}
        <section className="section section-right mobile_section_left mobile_section_bottom">
          <motion.div
            className="reacts"
            whileInView={"visible"}
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                opacity: 1,
              },
            }}
            viewport={{
              margin: isMobile ? "-70% 0px 0px 0px" : undefined,
            }}
          >
            {cssprojetcs.map((project, idx) => (
              <motion.div
                key={project.name}
                className="react"
                initial={{
                  opacity: 0,
                }}
                variants={{
                  visible: {
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 1,
                  delay: isMobile ? 0 : idx * 0.8, // show skill one by one after idx*0.62 s
                }}
              >
                <div className="react_label">
                  <img
                    className="react_label_image"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="react_info">
                    <a href={project.link} target="_blank">
                      <h2 className="react_label_name">{project.name}</h2>{" "}
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      className="react_label_description"
                    >
                      Github link
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* REACT */}
        <section className="section section-left mobile_section_bottom">
          <motion.div
            className="projects"
            whileInView={"visible"} // fadeIn/fadeOut
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                opacity: 1,
              },
            }}
            viewport={{
              margin: isMobile ? "-70% 0px 0px 0px" : undefined,
            }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                className="project"
                initial={{
                  opacity: 0,
                }}
                // 3. set jotai atom for each project
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setProject(project)
                }}
                variants={{
                  visible: {
                    opacity: 1,
                  },
                }}
                transition={{
                  duration: 1,
                  delay: isMobile ? 0 : idx * 0.5,
                }}
              >
                <a href={project.link} target="_blank">
                  <img
                    className="project_image"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="project_details">
                    <h2 className="project_details_name">{project.name}</h2>
                    <p className="project_details_description">
                      {project.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Nodejs */}
        <section className="section section-left mobile_section_bottom">
          <motion.div
            className="nextjs_infor"
            whileInView={"visible"} // fadeIn/fadeOut
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                opacity: 1,
              },
            }}
            viewport={{
              margin: isMobile ? "-70% 0px 0px 0px" : undefined,
            }}
          >
            <h2 className="nextjs_infor_name">Nodejs Projects</h2>
            <p className="nextjs_infor_description">
              Click images to view my Nodejs applications which is building
              RESTful API design and development with advanced features, CRUD
              operations with MongoDB database...
            </p>
          </motion.div>
        </section>

        {/* Nextjsjs */}
        <section className="section section-right mobile_section_bottom">
          <motion.div
            className="projects"
            whileInView={"visible"} // fadeIn/fadeOut
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                opacity: 1,
              },
            }}
            viewport={{
              margin: isMobile ? "-70% 0px 0px 0px" : undefined,
            }}
          >
            {nextprojects.map((project, idx) => (
              <motion.div
                key={project.name}
                className="project"
                initial={{
                  opacity: 0,
                  // y: -5,
                }}
                // 3. set jotai atom for each project
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setProject(project)
                }}
                variants={{
                  visible: {
                    opacity: 1,
                    // y: 0,
                  },
                }}
                transition={{
                  duration: 1,
                  delay: isMobile ? 0 : idx * 0.5,
                }}
              >
                <a href={project.link} target="_blank">
                  <img
                    className="project_image"
                    src={project.image}
                    alt={project.name}
                  />
                  <div className="project_details">
                    <h2 className="project_details_name">{project.name}</h2>
                    <p className="project_details_description">
                      {project.description}
                    </p>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CONTACT */}
        <section className="section section-left mobile_section_bottom">
          <motion.div
            className="contact"
            whileInView={"visible"} // fadeIn/fadeOut
            initial={{
              opacity: 0,
            }}
            variants={{
              visible: {
                opacity: 1,
              },
            }}
          >
            <h1 className="contact_name">{contact.name}</h1>
            <p className="contact_address">{contact.address}</p>
            <div className="contact_socials">
              <a href={contact.socials.linkedIn} target="_blank">
                <img
                  className="contact_social_icon"
                  src="icons/linkedin.png"
                  alt="linkedin"
                />
              </a>
              <a href={contact.socials.github} target="_blank">
                <img
                  className="contact_social_icon"
                  src="icons/github.png"
                  alt="github"
                />
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Interface

'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { motion, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

const WORD_COUNT = 7
const OFFSET_PERCENTAGE = 100 / WORD_COUNT

export default function Home() {
  const container = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const svg2 = useRef<SVGSVGElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    scrollYProgress.on('change', (event) => {
      if (!svg.current) return

      svg.current.style.transform = `rotate(${event * 360}deg)`

      if (!svg2.current) return
      svg2.current.style.transform = `rotate(-${event * 360}deg) scale(0.7)`
    })
  }, [scrollYProgress])

  return (
    <ReactLenis root>
      <div ref={container} className="overflow-x-hidden">
        <div className="h-[50vh]" />
        <div className="relative">
          <motion.svg
            ref={svg}
            className="w-full fill-purple-500 absolute top-0 left-0"
            viewBox="0 0 200 200"
          >
            <path
              id="curve"
              // stroke="black"
              fill="none"
              d="
            M 100, 100
            m 75, 0
            a 75,75 0 1,0 -150,0
            a 75,75 0 1,0  150,0
          "
            />
            <text>
              {[...Array(WORD_COUNT)].map((_, i) => (
                <textPath
                  key={i}
                  xlinkHref="#curve"
                  startOffset={`${i * OFFSET_PERCENTAGE}%`}
                >
                  LAYANE
                </textPath>
              ))}
            </text>
          </motion.svg>
          <motion.svg
            ref={svg2}
            className="w-full fill-purple-500"
            viewBox="0 0 200 200"
          >
            <path
              id="curve2"
              // stroke="black"
              fill="none"
              d="
            M 100, 100
            m 75, 0
            a 75,75 0 1,0 -150,0
            a 75,75 0 1,0  150,0
          "
            />
            <text>
              {[...Array(WORD_COUNT)].map((_, i) => (
                <textPath
                  key={i}
                  xlinkHref="#curve2"
                  startOffset={`${i * OFFSET_PERCENTAGE}%`}
                >
                  LAYANE
                </textPath>
              ))}
            </text>
          </motion.svg>
        </div>
        <div className="h-[50vh]" />
      </div>
    </ReactLenis>
  )
}

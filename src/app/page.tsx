'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { motion, useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

const WORD_COUNT = 7
const OFFSET_PERCENTAGE = 100 / WORD_COUNT

export default function Home() {
  const container = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    scrollYProgress.on('change', (event) => {
      if (!svg.current) return

      svg.current.style.transform = `rotate(${event * 360}deg)`
    })
  }, [scrollYProgress])

  return (
    <ReactLenis root>
      <div ref={container} className="overflow-x-hidden">
        <div className="h-[50vh]" />
        <motion.svg
          ref={svg}
          className="w-full fill-purple-500"
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
        <div className="h-[50vh]" />
      </div>
    </ReactLenis>
  )
}

'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { useScroll } from 'framer-motion'
import { useEffect, useRef } from 'react'

const WORD_COUNT = 7
const OFFSET_PERCENTAGE = 85 / WORD_COUNT

export default function Home() {
  const container = useRef<HTMLDivElement>(null)
  const texts = useRef<SVGTextPathElement[]>([])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    scrollYProgress.on('change', (event) => {
      texts.current.forEach((text, i) => {
        text.setAttribute(
          'startOffset',
          `${i * OFFSET_PERCENTAGE + event * OFFSET_PERCENTAGE}%`,
        )
      })
    })
  }, [scrollYProgress])

  return (
    <ReactLenis root>
      <div ref={container}>
        <div className="h-[50vh]" />
        <svg className="w-full" viewBox="0 0 200 200">
          <path
            id="curve"
            stroke="black"
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
                ref={(ref) => {
                  if (ref) texts.current[i] = ref
                }}
                xlinkHref="#curve"
                startOffset={`${i * OFFSET_PERCENTAGE}%`}
              >
                LAYANE
              </textPath>
            ))}
          </text>
        </svg>
        <div className="h-[50vh]" />
      </div>
    </ReactLenis>
  )
}

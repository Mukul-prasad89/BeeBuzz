import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({ target, duration = 2, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const num = parseInt(target.replace(/[^0-9]/g, ''), 10)
    if (isNaN(num)) return

    const step = num / (duration * 60)
    let current = 0
    let frame

    const animate = () => {
      current += step
      if (current >= num) {
        setCount(num)
        return
      }
      setCount(Math.floor(current))
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, target, duration])

  const display = count.toLocaleString('en-IN')

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  )
}

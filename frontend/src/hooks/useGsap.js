import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * useGsapEntrance – animates children on mount with a stagger effect.
 * Usage: const ref = useGsapEntrance()  →  <div ref={ref}>...</div>
 */
export function useGsapEntrance(selector = '.gsap-item', options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', ...options }
      )
    }, ref)
    return () => ctx.revert()
  }, [])
  return ref
}

/**
 * useGsapCounter – animates a number counting up.
 */
export function useGsapCounter(target, duration = 1.5) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current || !target) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString()
      },
    })
  }, [target, duration])
  return ref
}

/**
 * useGsapXPBar – animates a progress bar filling up.
 */
export function useGsapXPBar(percent) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { width: '0%' },
      { width: `${percent}%`, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [percent])
  return ref
}

/**
 * useGsapCardHover – adds magnetic hover to a card element.
 */
export function useGsapCardHover() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onEnter = () => gsap.to(el, { scale: 1.03, y: -4, duration: 0.3, ease: 'power2.out' })
    const onLeave = () => gsap.to(el, { scale: 1,    y:  0, duration: 0.3, ease: 'power2.out' })
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) }
  }, [])
  return ref
}

/**
 * animateXPGain – shows a floating +XP text on the screen.
 */
export function animateXPGain(xp, x, y) {
  const el = document.createElement('div')
  el.textContent = `+${xp} XP`
  el.style.cssText = `
    position: fixed; left: ${x}px; top: ${y}px;
    color: #f59e0b; font-weight: 800; font-size: 1.5rem;
    pointer-events: none; z-index: 9999; text-shadow: 0 0 10px #f59e0b;
  `
  document.body.appendChild(el)
  gsap.fromTo(el,
    { opacity: 1, y: 0, scale: 0.5 },
    {
      opacity: 0, y: -80, scale: 1.2, duration: 1.4,
      ease: 'power2.out',
      onComplete: () => el.remove(),
    }
  )
}

/**
 * animateAchievementPop – bounces the achievement modal in.
 */
export function animateAchievementPop(selector) {
  gsap.fromTo(selector,
    { scale: 0, opacity: 0, rotation: -10 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)' }
  )
}

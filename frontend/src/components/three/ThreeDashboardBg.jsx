import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeDashboardBg – subtle 3D grid + particle effect for the main app background.
 * Lighter than ThreeBackground – designed to run always without performance issues.
 */
export default function ThreeDashboardBg() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const W = mount.clientWidth
    const H = mount.clientHeight

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 500)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Grid plane ──────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(40, 40, 0x6366f1, 0x2a2a4a)
    gridHelper.position.y = -4
    gridHelper.rotation.x = 0.3
    scene.add(gridHelper)

    // ── Floating particles ──────────────────────────────────
    const partGeo   = new THREE.BufferGeometry()
    const count     = 300
    const pos       = new Float32Array(count * 3)
    const speeds    = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      speeds[i]      = Math.random() * 0.005 + 0.002
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const partMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size:  0.08,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(partGeo, partMat)
    scene.add(particles)

    // ── Animate ─────────────────────────────────────────────
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const positions = particles.geometry.attributes.position.array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += speeds[i]
        if (positions[i * 3 + 1] > 10) positions[i * 3 + 1] = -10
      }
      particles.geometry.attributes.position.needsUpdate = true
      gridHelper.position.z -= 0.01
      if (gridHelper.position.z < -5) gridHelper.position.z = 0
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  )
}

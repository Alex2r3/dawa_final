import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ThreeBackground – animates a starfield + floating particles using Three.js.
 * Used on Login & Register pages for a full-screen immersive background.
 */
export default function ThreeBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // Scene
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Stars ───────────────────────────────────────────────
    const starGeo    = new THREE.BufferGeometry()
    const starCount  = 2000
    const positions  = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starMat = new THREE.PointsMaterial({
      color: 0xaaaaff,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ── Floating orbs ───────────────────────────────────────
    const orbs = []
    const orbColors = [0x6366f1, 0x8b5cf6, 0xf59e0b, 0x10b981]
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 16, 16)
      const mat = new THREE.MeshBasicMaterial({
        color: orbColors[i % orbColors.length],
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      })
      const orb = new THREE.Mesh(geo, mat)
      orb.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5
      )
      orb.userData = {
        speedX: (Math.random() - 0.5) * 0.003,
        speedY: (Math.random() - 0.5) * 0.003,
        rotX:   (Math.random() - 0.5) * 0.01,
        rotY:   (Math.random() - 0.5) * 0.01,
      }
      scene.add(orb)
      orbs.push(orb)
    }

    // ── Torus ring ──────────────────────────────────────────
    const torusGeo = new THREE.TorusGeometry(2.5, 0.02, 8, 100)
    const torusMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.15 })
    const torus    = new THREE.Mesh(torusGeo, torusMat)
    torus.rotation.x = Math.PI / 4
    scene.add(torus)

    // ── Animation loop ──────────────────────────────────────
    let animId
    const clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      stars.rotation.y  = elapsed * 0.02
      stars.rotation.x  = elapsed * 0.01
      torus.rotation.z  = elapsed * 0.15
      torus.rotation.y  = elapsed * 0.08

      orbs.forEach(orb => {
        orb.position.x   += orb.userData.speedX
        orb.position.y   += orb.userData.speedY
        orb.rotation.x   += orb.userData.rotX
        orb.rotation.y   += orb.userData.rotY
        // Bounce back
        if (Math.abs(orb.position.x) > 6) orb.userData.speedX *= -1
        if (Math.abs(orb.position.y) > 5) orb.userData.speedY *= -1
      })

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize handler ──────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Mouse parallax ──────────────────────────────────────
    const onMouse = (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 0.5
      const y = (e.clientY / window.innerHeight - 0.5) * 0.5
      camera.position.x += (x - camera.position.x) * 0.05
      camera.position.y += (-y - camera.position.y) * 0.05
    }
    window.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

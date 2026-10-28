"use client"

import * as React from "react"
import { useMemo } from "react"
import * as THREE from "three"
import { useGLTF } from "@react-three/drei"

interface CarModelProps {
  isReflection?: boolean
}

export function CarModel({ isReflection = false }: CarModelProps) {
  // Chargement du modèle 3D glb haute fidélité (Concept Car PBR)
  const { scene } = useGLTF("/models/car.glb")

  // Cloner la scène pour pouvoir appliquer des matériaux différents entre la voiture et son reflet
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)

    clone.traverse((child) => {
      // 1. Masquer les éléments internes ou superflus qui créent du désordre visuel sous le châssis
      if (
        child.name === "License Plate" ||
        child.name.includes("Engine") ||
        child.name.includes("Pedal") ||
        child.name.includes("Floormat")
      ) {
        child.visible = false
        return
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        mesh.castShadow = !isReflection
        mesh.receiveShadow = !isReflection

        if (mesh.material) {
          const originalMat = mesh.material as THREE.MeshStandardMaterial
          const mat = originalMat.clone()

          // Carrosserie blanche céramique élégante et uniforme
          if (
            mesh.name.includes("Paint") ||
            mesh.name.includes("Body") ||
            mat.name?.includes("Paint")
          ) {
            mat.color = new THREE.Color(isReflection ? "#cbd5e1" : "#f8fafc")
            mat.roughness = isReflection ? 0.8 : 0.18
            mat.metalness = isReflection ? 0.05 : 0.35
          }

          // Dessous de caisse / soubassement : finition sombre mate nette
          if (mesh.name === "BodyUnderside") {
            mat.color = new THREE.Color("#0f172a")
            mat.roughness = 0.95
            mat.metalness = 0.05
          }

          // Vitrage fumé sombre (évite de voir l'intérieur en transparence sous cet angle)
          if (
            mesh.name.includes("Window") ||
            mesh.name.includes("Windshield") ||
            mat.name?.includes("Glass")
          ) {
            mat.color = new THREE.Color("#0a0f1d")
            mat.roughness = 0.1
            mat.metalness = 0.9
            mat.transparent = true
            mat.opacity = 0.88
          }

          // Feux stop arrière et lightbar LED rouge vif
          if (
            mesh.name.includes("Taillight") ||
            mesh.name.includes("Brakelight") ||
            mat.name?.includes("Brakelight")
          ) {
            mat.color = new THREE.Color("#ff1a1a")
            mat.emissive = new THREE.Color("#ff1a1a")
            mat.emissiveIntensity = isReflection ? 1.5 : 4.2
            mat.toneMapped = false
          }

          // Phares avant Matrix LED
          if (
            mesh.name.includes("Headlight") ||
            mat.name?.includes("Headlight")
          ) {
            mat.color = new THREE.Color("#e0f2fe")
            mat.emissive = new THREE.Color("#e0f2fe")
            mat.emissiveIntensity = isReflection ? 1.2 : 3.0
            mat.toneMapped = false
          }

          // Propriétés miroir pour le reflet au sol
          if (isReflection) {
            mat.transparent = true
            mat.opacity = 0.42
            mat.depthWrite = false
            mat.roughness = Math.max(mat.roughness, 0.75)
          }

          mesh.material = mat
        }
      }

      // Redresser les roues avant pour qu'elles soient parfaitement droites (parallèles à la route)
      if (child.name === "WheelFrontL" || child.name === "WheelFrontR") {
        child.rotation.set(0, 0, 0)
      }
    })

    return clone
  }, [scene, isReflection])

  // Géométrie d'un diffuseur / pare-choc arrière net, moderne et profilé (style Tesla Model S / Porsche Taycan)
  const bumperGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    // Profil d'un tablier arrière épuré
    shape.moveTo(-0.96, 0.14)
    shape.quadraticCurveTo(-0.96, 0.28, -0.86, 0.32)
    shape.lineTo(0.86, 0.32)
    shape.quadraticCurveTo(0.96, 0.28, 0.96, 0.14)
    shape.lineTo(0.92, 0.08)
    shape.lineTo(-0.92, 0.08)
    shape.closePath()

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 4,
    })
    extrude.center()
    return extrude
  }, [])

  return (
    <group position={[0, 0, 0]}>
      {/* Modèle 3D complet */}
      <primitive
        object={clonedScene}
        scale={0.92}
        position={[0, 0, 0]}
      />

      {/* Pare-choc / diffuseur arrière épuré pour masquer les mécaniques visibles et harmoniser la poupe */}
      <group position={[0, 0.20, -1.72]}>
        {/* Lame principale du pare-choc arrière sombre satiné */}
        <mesh geometry={bumperGeometry}>
          <meshStandardMaterial
            color="#0b1120"
            roughness={isReflection ? 0.9 : 0.4}
            metalness={0.25}
            transparent={isReflection}
            opacity={isReflection ? 0.45 : 1}
          />
        </mesh>

        {/* Liseré réflecteur horizontal fin rouge (signature basse moderne) */}
        <mesh position={[0, 0.02, -0.15]}>
          <boxGeometry args={[1.32, 0.022, 0.02]} />
          <meshStandardMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={isReflection ? 1.0 : 2.5}
            transparent={isReflection}
            opacity={isReflection ? 0.45 : 1}
            toneMapped={false}
          />
        </mesh>

        {/* Ailettes verticales aérodynamiques profilées */}
        {[-0.42, -0.18, 0.18, 0.42].map((x, i) => (
          <mesh key={i} position={[x, -0.04, -0.06]}>
            <boxGeometry args={[0.02, 0.06, 0.18]} />
            <meshStandardMaterial
              color="#020617"
              roughness={0.6}
              metalness={0.2}
              transparent={isReflection}
              opacity={isReflection ? 0.45 : 1}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Pré-chargement du modèle pour un affichage instantané sans scintillement
useGLTF.preload("/models/car.glb")

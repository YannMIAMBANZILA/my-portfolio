"use client"

import * as React from "react"
import { useMemo } from "react"
import * as THREE from "three"

// Composant pour une roue détaillée et stylisée (Pneu + Jante + Disque + Étrier de frein)
function StyledWheel({ isLeft }: { isLeft: boolean }) {
  const tireRadius = 0.34
  const tireWidth = 0.22
  const rimRadius = 0.23

  // Rayons de la jante (5 branches fines modernes)
  const spokes = useMemo(() => {
    return [0, 1, 2, 3, 4].map((i) => {
      const angle = (i * 2 * Math.PI) / 5
      return {
        id: i,
        rotation: [0, 0, angle] as [number, number, number],
      }
    })
  }, [])

  return (
    <group rotation={[0, isLeft ? 0 : Math.PI, 0]}>
      {/* Pneu avec flancs arrondis (caoutchouc mat sombre) */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tireRadius, tireRadius, tireWidth, 32]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Flanc extérieur du pneu arrondi */}
      <mesh position={[tireWidth / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[rimRadius, tireRadius, 32]} />
        <meshStandardMaterial color="#202328" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Jante en alliage titane satiné */}
      <group position={[tireWidth / 2 - 0.015, 0, 0]}>
        {/* Cerclage extérieur de jante */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[rimRadius - 0.03, rimRadius, 32]} />
          <meshStandardMaterial color="#475569" roughness={0.25} metalness={0.85} />
        </mesh>

        {/* Cœur concave de la jante */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-0.02, 0, 0]}>
          <circleGeometry args={[rimRadius - 0.03, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* 5 Branches en alliage profilées */}
        {spokes.map(({ id, rotation }) => (
          <group key={id} rotation={rotation}>
            <mesh position={[0, rimRadius * 0.52, 0]}>
              <boxGeometry args={[0.032, rimRadius * 0.85, 0.025]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Écrou central chromé */}
        <mesh position={[0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.1} metalness={0.95} />
        </mesh>
      </group>

      {/* Disque de frein en acier perforé en retrait */}
      <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <ringGeometry args={[0.08, rimRadius * 0.82, 24]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Étrier de frein sport orange vif (rappel visuel de la charte du portfolio) */}
      <mesh position={[0.03, rimRadius * 0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.04, 0.11, 0.06]} />
        <meshStandardMaterial color="#f97316" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  )
}

export function CarModel() {
  // Matériau carrosserie (Blanc nacré céramique moderne ultra-lisse avec reflets subtils)
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#f8fafc",
        roughness: 0.16,
        metalness: 0.28,
      }),
    []
  )

  // Matériau vitres fumées aérodynamiques
  const glassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#070b14",
        roughness: 0.06,
        metalness: 0.92,
        transparent: true,
        opacity: 0.88,
      }),
    []
  )

  // Matériau éléments aérodynamiques sombres (diffuseur, bas de caisse)
  const darkTrimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0f172a",
        roughness: 0.5,
        metalness: 0.3,
      }),
    []
  )

  // 1. GÉOMÉTRIE DE LA CARROSSERIE PRINCIPALE (Profil aérodynamique sculpté avec courbes douces)
  const { bodyGeometry, underbodyGeometry } = useMemo(() => {
    const shape = new THREE.Shape()

    // Contour latéral fluide (axe X du shape = axe Z de la voiture, axe Y du shape = axe Y de la voiture)
    // Coordonnées : Z négatif = avant, Z positif = arrière
    const frontTipZ = -2.12
    const rearTipZ = 1.98

    // Lame avant basse
    shape.moveTo(frontTipZ, 0.24)
    // Nez avant arrondi et calandre fuyante
    shape.quadraticCurveTo(-2.18, 0.42, -2.02, 0.52)
    // Capot plongeant avec courbe douce et tendue
    shape.quadraticCurveTo(-1.50, 0.65, -0.75, 0.68)
    // Ceinture de caisse élégante sous les vitres
    shape.quadraticCurveTo(0.20, 0.70, 1.25, 0.73)
    // Hanches arrière et malle de coffre galbée
    shape.quadraticCurveTo(1.72, 0.75, 1.95, 0.71)
    // Becquet arrière subtil et poupe sculptée
    shape.quadraticCurveTo(rearTipZ + 0.04, 0.62, rearTipZ, 0.45)
    // Pare-chocs arrière descendant vers le diffuseur
    shape.quadraticCurveTo(1.92, 0.28, 1.68, 0.24)

    // Découpe de l'arche de roue arrière (centre Z = 1.28, rayon = 0.44)
    shape.lineTo(1.68, 0.24)
    shape.absarc(1.28, 0.34, 0.44, 0, Math.PI, false)

    // Bas de caisse profilé entre les roues
    shape.lineTo(1.28 - 0.44, 0.23)
    shape.quadraticCurveTo(0, 0.22, -1.32 + 0.44, 0.23)

    // Découpe de l'arche de roue avant (centre Z = -1.32, rayon = 0.44)
    shape.absarc(-1.32, 0.34, 0.44, 0, Math.PI, false)

    // Jonction avec la lame avant
    shape.lineTo(-1.32 - 0.44, 0.24)
    shape.lineTo(frontTipZ, 0.24)

    // Largeur du corps principal (extrusion le long de X)
    const bodyWidth = 1.58
    const bevel = 0.08
    const bodyExtrude = new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: bodyWidth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5, // Arrondi très doux des arêtes
    })
    // Centrer sur l'axe X (car Three.js extrude de 0 à depth)
    bodyExtrude.translate(0, 0, -bodyWidth / 2)
    // Faire pivoter pour que l'axe X du shape devienne l'axe Z de la voiture
    bodyExtrude.rotateY(Math.PI / 2)

    // Sous-châssis / fond plat sombre
    const underShape = new THREE.Shape()
    underShape.moveTo(-2.0, 0.16)
    underShape.lineTo(1.9, 0.16)
    underShape.lineTo(1.9, 0.24)
    underShape.lineTo(-2.0, 0.24)
    underShape.closePath()

    const underExtrude = new THREE.ExtrudeGeometry(underShape, {
      depth: 1.5,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    })
    underExtrude.translate(0, 0, -0.75)
    underExtrude.rotateY(Math.PI / 2)

    return { bodyGeometry: bodyExtrude, underbodyGeometry: underExtrude }
  }, [])

  // 2. GÉOMÉTRIE DE L'HABITACLE & SURFACES VITRÉES (Canopy profilée en goutte d'eau)
  const { cabinGlassGeometry, roofPillarGeometry } = useMemo(() => {
    const shape = new THREE.Shape()

    // Profil de la verrière (plus étroite que la caisse pour une silhouette athlétique et réelle)
    // Base du pare-brise
    shape.moveTo(-0.68, 0.67)
    // Pare-brise profilé incliné et aérodynamique
    shape.quadraticCurveTo(-0.40, 0.98, -0.12, 1.15)
    // Ligne de toit en arc tendu et fluide
    shape.quadraticCurveTo(0.35, 1.18, 0.72, 1.14)
    // Lunette arrière fuyante (profil coupé / fastback)
    shape.quadraticCurveTo(1.15, 0.95, 1.52, 0.70)
    // Base des vitres
    shape.lineTo(-0.68, 0.67)

    const cabinWidth = 1.24
    const bevel = 0.05
    const glassExtrude = new THREE.ExtrudeGeometry(shape, {
      steps: 2,
      depth: cabinWidth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 4,
    })
    glassExtrude.translate(0, 0, -cabinWidth / 2)
    glassExtrude.rotateY(Math.PI / 2)

    // Arche de toit / montants supérieurs (couleur carrosserie)
    const roofArchShape = new THREE.Shape()
    roofArchShape.moveTo(-0.15, 1.14)
    roofArchShape.quadraticCurveTo(0.35, 1.19, 0.75, 1.14)
    roofArchShape.lineTo(0.75, 1.18)
    roofArchShape.quadraticCurveTo(0.35, 1.23, -0.15, 1.18)
    roofArchShape.closePath()

    const roofExtrude = new THREE.ExtrudeGeometry(roofArchShape, {
      depth: 1.16,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    })
    roofExtrude.translate(0, 0, -1.16 / 2)
    roofExtrude.rotateY(Math.PI / 2)

    return { cabinGlassGeometry: glassExtrude, roofPillarGeometry: roofExtrude }
  }, [])

  // 3. HANCHES & AILES GALBÉES (Donnent du relief et de la courbure organique au-dessus des roues)
  const fenderWheelGeometries = useMemo(() => {
    // Élargisseurs d'arches avant
    const frontFender = new THREE.CylinderGeometry(0.48, 0.48, 0.09, 24, 1, false, 0, Math.PI)
    frontFender.rotateZ(Math.PI / 2)

    // Élargisseurs d'arches arrière (épaules plus musclées)
    const rearFender = new THREE.CylinderGeometry(0.50, 0.50, 0.11, 24, 1, false, 0, Math.PI)
    rearFender.rotateZ(Math.PI / 2)

    return { frontFender, rearFender }
  }, [])

  // 4. BANDEAU DE FEUX ARRIÈRE LED INCURVÉ (Lightbar moderne épurée)
  const rearLightGeometry = useMemo(() => {
    // Forme incurvée épousant le galbe de la poupe
    const lightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.72, 0.63, 1.92),
      new THREE.Vector3(-0.45, 0.65, 1.97),
      new THREE.Vector3(0, 0.66, 1.98),
      new THREE.Vector3(0.45, 0.65, 1.97),
      new THREE.Vector3(0.72, 0.63, 1.92),
    ])
    return new THREE.TubeGeometry(lightCurve, 32, 0.026, 12, false)
  }, [])

  // 5. SIGNATURE LUMINEUSE AVANT (Optiques effilées avec lueur blanc bleuté)
  const frontLightGeometries = useMemo(() => {
    const leftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.45, 0.52, -1.98),
      new THREE.Vector3(-0.62, 0.50, -2.04),
      new THREE.Vector3(-0.76, 0.48, -1.90),
    ])
    const rightCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.45, 0.52, -1.98),
      new THREE.Vector3(0.62, 0.50, -2.04),
      new THREE.Vector3(0.76, 0.48, -1.90),
    ])
    return {
      left: new THREE.TubeGeometry(leftCurve, 16, 0.022, 10, false),
      right: new THREE.TubeGeometry(rightCurve, 16, 0.022, 10, false),
    }
  }, [])

  return (
    <group position={[0, 0, 0]}>
      {/* --- CARROSSERIE PRINCIPALE --- */}
      <mesh geometry={bodyGeometry} material={bodyMaterial} castShadow receiveShadow />

      {/* --- SOUS-CHÂSSIS SOMBRE --- */}
      <mesh geometry={underbodyGeometry} material={darkTrimMaterial} />

      {/* --- HABITACLE EN VERRE PROFILÉ & MONTANTS --- */}
      <mesh geometry={cabinGlassGeometry} material={glassMaterial} castShadow />
      <mesh geometry={roofPillarGeometry} material={bodyMaterial} castShadow />

      {/* --- ÉPAULES ET PASSAGES DE ROUES GALBÉS (Gauche & Droite) --- */}
      <mesh
        position={[-0.83, 0.34, -1.32]}
        geometry={fenderWheelGeometries.frontFender}
        material={bodyMaterial}
      />
      <mesh
        position={[0.83, 0.34, -1.32]}
        geometry={fenderWheelGeometries.frontFender}
        material={bodyMaterial}
      />
      <mesh
        position={[-0.85, 0.34, 1.28]}
        geometry={fenderWheelGeometries.rearFender}
        material={bodyMaterial}
      />
      <mesh
        position={[0.85, 0.34, 1.28]}
        geometry={fenderWheelGeometries.rearFender}
        material={bodyMaterial}
      />

      {/* --- DIFFUSEUR ARRIÈRE AÉRODYNAMIQUE --- */}
      <group position={[0, 0.26, 1.88]}>
        {/* Lame principale du diffuseur */}
        <mesh>
          <boxGeometry args={[1.35, 0.07, 0.22]} />
          <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Ailettes verticales du diffuseur */}
        {[-0.35, -0.12, 0.12, 0.35].map((x, i) => (
          <mesh key={i} position={[x, -0.01, 0.02]} rotation={[-0.15, 0, 0]}>
            <boxGeometry args={[0.02, 0.06, 0.16]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.2} />
          </mesh>
        ))}
        {/* Catadioptres arrière fins */}
        <mesh position={[-0.55, 0.04, 0.10]}>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial color="#b91c1c" emissive="#ef4444" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.55, 0.04, 0.10]}>
          <boxGeometry args={[0.14, 0.02, 0.02]} />
          <meshStandardMaterial color="#b91c1c" emissive="#ef4444" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* --- LAME AÉRO AVANT / SPLITTER --- */}
      <mesh position={[0, 0.24, -2.06]}>
        <boxGeometry args={[1.35, 0.04, 0.16]} />
        <meshStandardMaterial color="#090d16" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* --- RÉTROVISEURS AÉRODYNAMIQUE PROFILÉS --- */}
      {/* Rétroviseur Gauche */}
      <group position={[-0.82, 0.72, -0.45]}>
        <mesh rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.02, 0.08, 0.02]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[-0.07, 0.03, 0]}>
          <sphereGeometry args={[0.055, 16, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.16} metalness={0.28} />
        </mesh>
        {/* Miroir */}
        <mesh position={[-0.07, 0.03, 0.04]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.05} metalness={0.98} />
        </mesh>
      </group>
      {/* Rétroviseur Droit */}
      <group position={[0.82, 0.72, -0.45]}>
        <mesh rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.02, 0.08, 0.02]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.07, 0.03, 0]}>
          <sphereGeometry args={[0.055, 16, 12]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.16} metalness={0.28} />
        </mesh>
        {/* Miroir */}
        <mesh position={[0.07, 0.03, 0.04]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.05} metalness={0.98} />
        </mesh>
      </group>

      {/* --- LES 4 ROUES INTÉGRÉES DANS LES PASSAGES DE ROUES --- */}
      {/* Roue Avant Gauche */}
      <group position={[-0.85, 0.34, -1.32]}>
        <StyledWheel isLeft={true} />
      </group>
      {/* Roue Avant Droite */}
      <group position={[0.85, 0.34, -1.32]}>
        <StyledWheel isLeft={false} />
      </group>
      {/* Roue Arrière Gauche */}
      <group position={[-0.87, 0.34, 1.28]}>
        <StyledWheel isLeft={true} />
      </group>
      {/* Roue Arrière Droite */}
      <group position={[0.87, 0.34, 1.28]}>
        <StyledWheel isLeft={false} />
      </group>

      {/* --- BANDEAU LUMINEUX ARRIÈRE LED INCURVÉ (Lightbar moderne) --- */}
      <mesh geometry={rearLightGeometry}>
        <meshStandardMaterial
          color="#ff1a1a"
          emissive="#ff1a1a"
          emissiveIntensity={3.6}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* --- SIGNATURE LUMINEUSE AVANT (Matrix LED blanche/bleutée) --- */}
      <mesh geometry={frontLightGeometries.left}>
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#e0f2fe"
          emissiveIntensity={2.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={frontLightGeometries.right}>
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#e0f2fe"
          emissiveIntensity={2.8}
          roughness={0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

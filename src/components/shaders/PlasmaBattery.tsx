import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uLevel; // 0.0 to 1.0
uniform float uCharging; // 0.0 or 1.0
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

// Simple pseudo-random noise
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
  //Coordinate manipulation
  vec2 pos = vUv;
  
  // Flow spread
  float n = noise(pos * 5.0 + uTime * (0.5 + uCharging)); 
  
  // Define liquid edge based on uLevel
  // We want the fill to go from left to right (x axis) or bottom to top. 
  // Let's do horizontal fill for a bar.
  float edgeInfo = smoothstep(uLevel - 0.02, uLevel + 0.02, pos.x);
  
  // Liquid Color
  vec3 liquid = mix(uColorA, uColorB, n + pos.x);
  
  // Empty space color (dimmed)
  vec3 empty = vec3(0.05, 0.05, 0.05);
  
  // Apply level mask (invert edgeInfo because smoothstep returns 0..1, we want 1 where x < Level)
  vec3 finalColor = mix(liquid, empty, edgeInfo);

  // Add a glowing "surface" line at the fill level
  float surfaceLine = 1.0 - smoothstep(0.0, 0.02, abs(pos.x - uLevel));
  finalColor += surfaceLine * vec3(1.0, 1.0, 1.0);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

interface PlasmaBatteryProps {
	level?: number; // 0-100
	charging?: boolean;
}

export function PlasmaBattery({
	level = 50,
	charging = false,
}: PlasmaBatteryProps) {
	const meshRef = useRef<THREE.Mesh>(null);
	const materialRef = useRef<THREE.ShaderMaterial>(null);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uLevel: { value: level / 100 },
			uCharging: { value: charging ? 1.0 : 0.0 },
			uColorA: { value: new THREE.Color("#0052cc") }, // Pulsar Blue
			uColorB: { value: new THREE.Color("#00E5FF") }, // Cyan
		}),
		[],
	);

	useFrame((state) => {
		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
			// Lerp level for smoothness
			materialRef.current.uniforms.uLevel.value = THREE.MathUtils.lerp(
				materialRef.current.uniforms.uLevel.value,
				level / 100,
				0.1,
			);
			materialRef.current.uniforms.uCharging.value = charging ? 1.0 : 0.0;

			// Dynamic color shift based on health
			const targetColor = level > 20 ? "#0052cc" : "#ff6b35";
			// We can animate this later, for now just set it
			materialRef.current.uniforms.uColorA.value.set(targetColor);
		}
	});

	return (
		<mesh ref={meshRef} position={[0, 0, 0]} scale={[3, 0.5, 1]}>
			<planeGeometry args={[1, 1, 32, 32]} />
			<shaderMaterial
				ref={materialRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
			/>
		</mesh>
	);
}

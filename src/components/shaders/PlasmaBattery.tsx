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

// Simplex Noise (approx)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 pos = vUv;
  
  // physics: slosh effect on the surface
  // Wave frequency increases with charging
  float slosh = sin(pos.y * 10.0 + uTime * 3.0) * 0.02 * uCharging;
  slosh += snoise(vec2(pos.y * 4.0, uTime)) * 0.03;
  
  // Effective level with slosh
  float effectiveLevel = uLevel + slosh;
  
  // Edge detection
  // We fill x-axis: 0.0 is empty, 1.0 is full
  float edge = smoothstep(effectiveLevel - 0.02, effectiveLevel + 0.02, pos.x);
  
  // Liquid internal turbulence
  float n = snoise(pos * 8.0 + uTime * (0.2 + uCharging * 0.8));
  
  vec3 liquid = mix(uColorA, uColorB, n * 0.5 + 0.5);
  
  // Darker background for empty space
  vec3 empty = vec3(0.02, 0.02, 0.02);
  
  // Mix liquid and empty
  // edge is 0 where x < effectiveLevel (liquid side if we invert logic or check step)
  // standard smoothstep(edge, ...) -> 0 before edge, 1 after.
  // We want liquid (0) then empty (1).
  vec3 finalColor = mix(liquid, empty, edge);

  // Surface glow line
  float surfaceGlow = 1.0 - smoothstep(0.0, 0.03, abs(pos.x - effectiveLevel));
  finalColor += surfaceGlow * vec3(1.0, 1.0, 1.0) * 0.8;

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

			// Dynamic color shift based on health with smooth lerp target
			let targetHex = "#0052cc"; // Normal
			if (level <= 20)
				targetHex = "#ef4444"; // Critical (Red)
			else if (level <= 50) targetHex = "#ff6b35"; // Warning (Orange)

			// Lerp current color to target color
			const targetColor = new THREE.Color(targetHex);
			materialRef.current.uniforms.uColorA.value.lerp(targetColor, 0.05);

			// Secondary color is always a brighter/shifted version
			const secondary = targetColor.clone().offsetHSL(0.1, 0, 0.1);
			materialRef.current.uniforms.uColorB.value.lerp(secondary, 0.05);
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

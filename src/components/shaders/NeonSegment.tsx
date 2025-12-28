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
uniform float uValue; // 0-9, 10=off
uniform vec3 uColor;
varying vec2 vUv;

// SDF for a rounded box segment
float sdBox( in vec2 p, in vec2 b ) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

// Function to draw a segment
float segment(vec2 uv, vec2 pos, vec2 size) {
    float d = sdBox(uv - pos, size);
    // Glow effect: smoothstep for core + inverse distance for glow
    float glow = 0.002 / (abs(d) + 0.0001); // boost glow
    float core = 1.0 - smoothstep(0.0, 0.005, d);
    return core + glow * 0.5;
}

void main() {
    // Current digit integer
    int val = int(uValue + 0.5);
    
    // Map UVs to -0.5 to 0.5 for easier centering, aspect corrected implicitly by geometry
    vec2 pos = vUv - 0.5;
    pos.y *= 1.6; // Tall aspect ratio adjustment
    
    vec3 col = vec3(0.0);
    float intensity = 0.0;
    
    // Segment definitions (positions and sizes)
    vec2 hSize = vec2(0.15, 0.02); // Horizontal segment size
    vec2 vSize = vec2(0.02, 0.15); // Vertical segment size
    
    // A: Top
    if (val != 1 && val != 4) 
        intensity += segment(pos, vec2(0.0, 0.35), hSize);
        
    // B: Top Right
    if (val != 5 && val != 6) 
        intensity += segment(pos, vec2(0.18, 0.18), vSize);
        
    // C: Bottom Right
    if (val != 2) 
        intensity += segment(pos, vec2(0.18, -0.18), vSize);
        
    // D: Bottom
    if (val != 1 && val != 4 && val != 7) 
        intensity += segment(pos, vec2(0.0, -0.35), hSize);
        
    // E: Bottom Left
    if (val == 0 || val == 2 || val == 6 || val == 8) 
        intensity += segment(pos, vec2(-0.18, -0.18), vSize);
        
    // F: Top Left
    if (val != 1 && val != 2 && val != 3 && val != 7) 
        intensity += segment(pos, vec2(-0.18, 0.18), vSize);
        
    // G: Middle
    if (val != 0 && val != 1 && val != 7) 
        intensity += segment(pos, vec2(0.0, 0.0), hSize);

    col = uColor * intensity;
    
    // Add a faint background ghost of inactive segments (optional, for realism)
    // For now, pure black background
    
    gl_FragColor = vec4(col, 1.0);
}
`;

interface NeonSegmentProps {
	value: number; // 0-9
	color?: string;
}

export function NeonSegment({ value, color = "#0052cc" }: NeonSegmentProps) {
	const materialRef = useRef<THREE.ShaderMaterial>(null);

	const uniforms = useMemo(
		() => ({
			uValue: { value: value },
			uColor: { value: new THREE.Color(color) },
		}),
		[color], // Re-create uniforms only if initial color changes (which it usually doesn't strictly needs to)
	);

	// Update uniforms on render
	useFrame(() => {
		if (materialRef.current) {
			materialRef.current.uniforms.uValue.value = value;
			materialRef.current.uniforms.uColor.value.set(color);
		}
	});

	return (
		<mesh scale={[1, 1, 1]}>
			<planeGeometry args={[1, 1.6]} /> {/* Aspect Ratio match */}
			<shaderMaterial
				ref={materialRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={uniforms}
				transparent
				depthWrite={false}
			/>
		</mesh>
	);
}

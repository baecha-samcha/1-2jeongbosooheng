// 파일명: src/App.jsx

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 기본 세팅
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    mountRef.current.appendChild(renderer.domElement);

    // 조명
    const light = new THREE.PointLight(0xffffff, 2);
    light.position.set(10, 10, 10);
    scene.add(light);

    // 다면체 (정이십면체 기반)
    const geometry = new THREE.IcosahedronGeometry(3, 2); // subdivision 2로 부드럽게
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      wireframe: true,
      emissive: 0x004040,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 8;

    // 회전 속도 관련 변수
    let rotationSpeed = 0.001;
    let isDragging = false;

    // 마우스 드래그 이벤트
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.4;

    renderer.domElement.addEventListener("mousedown", () => {
      isDragging = true;
      rotationSpeed = 0.02;
    });

    renderer.domElement.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // 리사이즈 대응
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += rotationSpeed;
      sphere.rotation.y += rotationSpeed * 0.7;

      if (!isDragging && rotationSpeed > 0.001)
        rotationSpeed *= 0.98; // 서서히 감속

      renderer.render(scene, camera);
    };
    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: "grab",
      }}
    />
  );
}

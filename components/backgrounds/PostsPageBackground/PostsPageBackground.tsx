import React, { FC, useEffect, useRef } from "react";
import styles from "./PostsPageBackground.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace,
  SpriteMaterial,
  Sprite,
  PointLight,
  MeshToonMaterial,
} from "three";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  BloomEffect,
  ScanlineEffect,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  KernelSize,
  RenderPass,
  BlendFunction,
  NoiseEffect,
} from "postprocessing";

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const PostsPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const gltfLoader = new GLTFLoader();
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      const renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      backgroundRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      // Set up the space skybox
      const spaceTexture = new TextureLoader().load("/threeJs/posts/space.png");
      spaceTexture.colorSpace = SRGBColorSpace;
      scene.background = spaceTexture;

      // Stars
      const starMap = new TextureLoader().load("/threeJs/posts/star.png");
      const starMaterial = new SpriteMaterial({ map: starMap });

      for (let i = 0; i < 250; i++) {
        const star = new Sprite(starMaterial);
        const starScale = Math.random() * 4;

        star.position.x = (Math.random() - 0.5) * 600;
        star.position.y = (Math.random() - 0.5) * 300;
        star.position.z = -100 - Math.random() * 100;
        star.scale.x = starScale;
        star.scale.y = starScale;

        scene.add(star);
      }

      // Sun
      const sunMap = new TextureLoader().load("/threeJs/posts/sun.png");
      const sunMaterial = new SpriteMaterial({ map: sunMap });
      const sun = new Sprite(sunMaterial);

      const sun2Material = new SpriteMaterial({ map: sunMap });
      const sun2 = new Sprite(sun2Material);

      sun.position.x = 4;
      sun.scale.x = 5;
      sun.scale.y = 5;

      sun2.position.x = 4;
      sun2.position.z = 0.01;
      sun2.scale.x = 5;
      sun2.scale.y = 5;

      scene.add(sun);
      scene.add(sun2);

      // Ring Planet
      const ringPlanetPieces: string[] = [
        "/threeJs/posts/ringPlanet.glb",
        // "/threeJs/posts/ringPlanetRings.glb"
      ];

      ringPlanetPieces.forEach((piece) => {
        gltfLoader.load(
          piece,
          (gltf) => {
            const ringPlanet = gltf.scene;

            ringPlanet.traverse((o: any) => {
              if (o.isMesh) {
                const newMaterial = new MeshToonMaterial({
                  map: o.material.map,
                });
                o.material = newMaterial;
              }
            });

            ringPlanet.rotation.x = 25.5;
            ringPlanet.rotation.y = 30.5;
            ringPlanet.rotation.z = -22.5;
            ringPlanet.position.x = 1;
            ringPlanet.position.y = 5;
            ringPlanet.position.z = -10;

            scene.add(ringPlanet);
          },
          undefined,
          (error) => {
            console.error(error);
          },
        );
      });

      // Lighting
      const sunLight = new PointLight(0xffffff, 20, 11.5, 0);
      sunLight.position.x = 4;

      scene.add(sunLight);

      // Post Processing Effects
      const sunRays = new GodRaysEffect(camera, sun2, {
        height: 960,
        kernelSize: KernelSize.SMALL,
        density: 0.96,
        decay: 0.92,
        weight: 0.5,
        exposure: 0.25,
        samples: 120,
        clampMax: 1,
      });

      const bloom = new BloomEffect({
        intensity: 3,
        radius: 0.2,
      });

      const noise = new NoiseEffect({
        blendFunction: BlendFunction.COLOR_DODGE,
      });
      noise.blendMode.opacity.value = 0.035;

      const scanlines = new ScanlineEffect({
        blendFunction: BlendFunction.MULTIPLY,
        density: 1.0,
      });
      scanlines.blendMode.opacity.value = 0.1;
      scanlines.scrollSpeed = 0.05;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new EffectPass(camera, sunRays));
      // composer.addPass(new EffectPass(camera, bloom));
      composer.addPass(new EffectPass(camera, noise));
      composer.addPass(new EffectPass(camera, scanlines));

      // Render

      const renderScene = () => {
        sunMaterial.rotation += 0.001;
        sun2Material.rotation += 0.001;
        sun.scale.x += 0.0075;
        sun.scale.y += 0.0075;
        sunMaterial.opacity -= 0.008;

        if (sun.scale.x >= 6.2) {
          sun.scale.x = 5;
          sun.scale.y = 5;
          sunMaterial.opacity = 1;
        }

        renderer.render(scene, camera);
        composer.render();

        requestAnimationFrame(renderScene);
      };

      renderScene();
    }
  }, []);

  return <div ref={backgroundRef} className={styles.postsPageBackground} />;
};

export default PostsPageBackground;

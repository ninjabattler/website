import React, { FC, useEffect, useRef } from "react";
import styles from "./PostsPageBackground.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
  SpriteMaterial,
  Sprite,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import {
  DepthOfFieldEffect,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  KernelSize,
  RenderPass,
} from "postprocessing";

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const PostsPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
      const stars = new Array(0);
      for (let i = 0; i < 250; i++) {
        const x = (Math.random() - 0.5) * 600;
        const y = (Math.random() - 0.5) * 300;
        const z = -100 - Math.random() * 100;

        stars.push(x, y, z);
      }

      const starsGeometry = new BufferGeometry();
      starsGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(stars, 3),
      );
      const starsMaterial = new PointsMaterial({ color: 0xffff99 });
      const starField = new Points(starsGeometry, starsMaterial);

      scene.add(starField);

      // Sun
      const sunMap = new TextureLoader().load("/threeJs/posts/sun.png");
      const sunMaterial = new SpriteMaterial({ map: sunMap });
      const sun = new Sprite(sunMaterial);
      sun.position.x = 4;
      sun.scale.x = 6;
      sun.scale.y = 6;

      scene.add(sun);

      // Post Processing Effects
      const sunRays = new GodRaysEffect(camera, sun, {
        height: 960,
        kernelSize: KernelSize.SMALL,
        density: 0.96,
        decay: 0.92,
        weight: 0.5,
        exposure: 0.54,
        samples: 120,
        clampMax: 1,
        blur: false,
      });

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new EffectPass(camera, sunRays));

      const renderScene = () => {
        sunMaterial.rotation += 0.001;

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

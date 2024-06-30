import React, { FC, useEffect, useRef } from "react";
import styles from "./HomePageBackground.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  SRGBColorSpace,
  SpriteMaterial,
  Sprite,
  PointLight,
  Fog,
  Object3DEventMap,
} from "three";
// @ts-expect-error - CommonJs warning
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
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
// @ts-expect-error - CommonJs warning
import { lerp } from "three/src/math/MathUtils.js";

type HomePageBackgroundProps = {
  spaceColour?: string;
  starsColour?: string;
};

/**
 * The three js space background for the Review page
 * @author Ninjabattler
 */
const HomePageBackground: FC<HomePageBackgroundProps> = ({
  spaceColour,
  starsColour,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Scene and Renderer
      const gltfLoader = new GLTFLoader();
      const scene = new Scene();
      scene.fog = new Fog(0xffffff);

      const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );

      const renderer = new WebGLRenderer({
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      backgroundRef.current?.appendChild(renderer.domElement);
      camera.position.y = -0.1;
      camera.position.z = 5;

      // Set up the space skybox
      const spaceMap = new TextureLoader().load("/threeJs/homePageSpace.png");
      spaceMap.colorSpace = SRGBColorSpace;
      scene.background = spaceMap;

      // Stars
      const starMap = new TextureLoader().load("/threeJs/posts/star.png");
      const starMaterial = new SpriteMaterial({
        map: starMap,
        color: starsColour || undefined,
      });

      const stars: { scaleUp: boolean; star: Sprite<Object3DEventMap> }[] = [];

      for (let i = 0; i < 250; i++) {
        const star = new Sprite(starMaterial);
        const starScale = 2 + Math.random() * 2;

        star.position.x = (Math.random() - 0.5) * 600;
        star.position.y = (Math.random() - 0.5) * 300;
        star.position.z = -150 - Math.random() * 50;
        star.scale.x = starScale;
        star.scale.y = starScale;

        scene.add(star);
        stars.push({ scaleUp: true, star });
      }

      // Sun
      const sunMap = new TextureLoader().load("/threeJs/posts/sun.png");
      const sunMaterial = new SpriteMaterial({
        map: sunMap,
        color: starsColour || undefined,
        alphaHash: true,
      });
      const sun = new Sprite(sunMaterial);

      const sun2Material = new SpriteMaterial({
        map: sunMap,
        color: starsColour || undefined,
      });
      const sun2 = new Sprite(sun2Material);

      sun.position.z = -10.01;
      sun.scale.x = 17;
      sun.scale.y = 17;

      sun2.position.z = -10;
      sun2.scale.x = 17;
      sun2.scale.y = 17;

      scene.add(sun);
      scene.add(sun2);

      // Ring Planet
      const ringPlanetMap = new TextureLoader().load(
        "/threeJs/home/ringPlanet.png",
      );
      const ringPlanetMaterial = new SpriteMaterial({
        map: ringPlanetMap,
        color: starsColour || undefined,
        alphaHash: true,
      });
      const ringPlanet = new Sprite(ringPlanetMaterial);
      ringPlanet.position.y = -1.75;
      ringPlanet.position.z = 0;
      ringPlanet.scale.x = 5;
      ringPlanet.scale.y = 5 * 0.5625;

      scene.add(ringPlanet);

      // Lighting
      const sunLight = new PointLight(0xfffcbc, 10, 100, 0.01);
      sunLight.position.y = 0;
      sunLight.position.z = 1;

      // scene.add(sunLight);

      // Post Processing Effects
      // @ts-expect-error
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
        intensity: 1,
        radius: 0.1,
      });

      const noise = new NoiseEffect({
        blendFunction: BlendFunction.COLOR_DODGE,
      });
      noise.blendMode.opacity.value = 0.04;

      const scanlines = new ScanlineEffect({
        blendFunction: BlendFunction.MULTIPLY,
        density: 1.0,
      });
      scanlines.blendMode.opacity.value = 0.1;
      scanlines.scrollSpeed = 0.05;

      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new EffectPass(camera, bloom));
      composer.addPass(new EffectPass(camera, sunRays));
      composer.addPass(new EffectPass(camera, noise));
      composer.addPass(new EffectPass(camera, scanlines));

      // Render
      const renderScene = () => {
        requestAnimationFrame(renderScene);

        sunMaterial.rotation += 0.001;
        sun2Material.rotation += 0.001;
        sun.scale.x += 0.0075;
        sun.scale.y += 0.0075;
        sunMaterial.opacity -= 0.008;

        if (sun.scale.x >= 18.2) {
          sun.scale.x = 17;
          sun.scale.y = 17;
          sunMaterial.opacity = 1;
        }

        if (camera.position.y < 0) {
          camera.position.y = lerp(camera.position.y, 0, 0.0075);
        }

        stars.forEach((star) => {
          if (star.scaleUp) {
            star.star.scale.x += 0.015;
            star.star.scale.y += 0.015;
          } else {
            star.star.scale.x -= 0.015;
            star.star.scale.y -= 0.015;
          }

          if (star.star.scale.x > 4) {
            star.scaleUp = false;
          }

          if (star.star.scale.x < 2) {
            star.scaleUp = true;
          }
        });

        renderer.render(scene, camera);
        composer.render();
      };

      renderScene();
    }
  }, []);

  return <div ref={backgroundRef} className={styles.homePageBackground} />;
};

export default HomePageBackground;

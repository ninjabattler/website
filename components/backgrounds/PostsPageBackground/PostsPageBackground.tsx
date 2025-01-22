import React, { FC, useEffect, useRef } from "react";
import styles from "./PostsPageBackground.module.scss";
import {
  createAsteroidsObject,
  createAsteroidsGroup,
  rotateAsteroids,
  createSpaceClouds,
  createStars,
  scaleStars,
  createSpriteObject,
  initSpaceBackground,
  createPostProcessing,
  rotateAsteroidBelt,
  rotateSun,
  setSpriteSheetRepeat,
} from "../../../utils/threeJsBackgroundHelpers";
import { Vector2 } from "three";

const desktopObjectSettings = {
  sun: {
    position: { x: 10, y: 0, z: -10 },
    scale: { x: 18.5, y: 18.5 },
  },
  ringPlanet: {
    position: { x: 21.5, y: -3, z: -11 },
    scale: { x: 7, y: 7 * 0.5625 },
  },
  icePlanet: {
    position: { x: 3.25, y: 1 },
    scale: { x: 8.5, y: 8.5 * 0.5625 },
  },
  desertPlanet: {
    position: { x: 0, y: 1, z: -11 },
    scale: { x: 7.5, y: 7.5 * 0.5625 },
  },
};

const mobileObjectSettings = {
  sun: {
    position: { x: 0, y: 0, z: -10 },
    scale: { x: 10.5, y: 10.5 },
  },
  ringPlanet: {
    position: { x: 5, y: -3, z: -11 },
    scale: { x: 3.75, y: 3.75 * 0.5625 },
  },
  icePlanet: {
    position: { x: 0, y: 1 },
    scale: { x: 4.5, y: 4.5 * 0.5625 },
  },
  desertPlanet: {
    position: { x: -6, y: 1, z: -11 },
    scale: { x: 4.5, y: 4.5 * 0.5625 },
  },
};

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const PostsPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { scene, camera, renderer } = initSpaceBackground(backgroundRef);
      let sunOffset = 0;
      let sunOffsetTimer = 10;

      const spaceClouds = createSpaceClouds(
        "/threeJs/homePageSpace.png",
        0x192545,
        camera,
      );
      const sun = createSpriteObject("/threeJs/sun.jpg", {
        position:
          window.innerWidth > 430
            ? desktopObjectSettings.sun.position
            : mobileObjectSettings.sun.position,
        scale:
          window.innerWidth > 430
            ? desktopObjectSettings.sun.scale
            : mobileObjectSettings.sun.scale,
        alphaMap: "/threeJs/sun.png",
      });
      setSpriteSheetRepeat(sun, 24);

      const ringPlanet = createSpriteObject("/threeJs/posts/ringPlanet.webp", {
        position:
          window.innerWidth > 430
            ? desktopObjectSettings.ringPlanet.position
            : mobileObjectSettings.ringPlanet.position,
        scale:
          window.innerWidth > 430
            ? desktopObjectSettings.ringPlanet.scale
            : mobileObjectSettings.ringPlanet.scale,
      });
      const icePlanet = createSpriteObject("/threeJs/posts/icePlanet.webp", {
        position:
          window.innerWidth > 430
            ? desktopObjectSettings.icePlanet.position
            : mobileObjectSettings.icePlanet.position,
        scale:
          window.innerWidth > 430
            ? desktopObjectSettings.icePlanet.scale
            : mobileObjectSettings.icePlanet.scale,
      });
      const desertPlanet = createSpriteObject(
        "/threeJs/posts/desertPlanet.webp",
        {
          position:
            window.innerWidth > 430
              ? desktopObjectSettings.desertPlanet.position
              : mobileObjectSettings.desertPlanet.position,
          scale:
            window.innerWidth > 430
              ? desktopObjectSettings.desertPlanet.scale
              : mobileObjectSettings.desertPlanet.scale,
        },
      );
      // const asteroidsObject = createAsteroidsObject();
      // const asteroidsGroup = createAsteroidsGroup(asteroidsObject);
      const stars = createStars();

      scene.add(spaceClouds);
      scene.add(sun);
      scene.add(ringPlanet);
      scene.add(icePlanet);
      scene.add(desertPlanet);
      // scene.add(asteroidsGroup);
      stars.forEach(({ star }) => {
        scene.add(star);
      });

      const composer = createPostProcessing(scene, camera, renderer, sun);

      const renderScene = () => {
        scaleStars(stars);
        rotateSun(sun);

        if (sunOffsetTimer > 0) {
          sunOffsetTimer -= 0.75;
        } else {
          sunOffset += 1 / 24;
          sunOffsetTimer = 10;

          if (sun.material.map) {
            sun.material.map.offset = new Vector2(sunOffset, 0);
          }
        }

        // rotateAsteroidBelt(asteroidsGroup);
        // rotateAsteroids(asteroidsObject);

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

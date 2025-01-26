import React, { FC, useEffect, useRef } from "react";
import styles from "./ReviewPageBackground.module.scss";
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

type ReviewPageBackgroundProps = {
  spaceColour?: string;
  starsColour?: string;
};

/**
 * The three js space background for the Review page
 * @author Ninjabattler
 */
const ReviewPageBackground: FC<ReviewPageBackgroundProps> = ({
  spaceColour,
  starsColour,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { scene, camera, renderer } = initSpaceBackground(backgroundRef);
      let sunOffset = 0;
      let sunOffsetTimer = 10;

      const spaceClouds = createSpaceClouds(
        "/threeJs/homePageSpace.png",
        spaceColour || 0x293555,
        camera,
      );
      const sun = createSpriteObject("/threeJs/sun.jpg", {
        position: { z: -10 },
        scale: { x: 18.5, y: 18.5 },
        colour: starsColour || undefined,
        alphaMap: "/threeJs/sun.png",
      });
      setSpriteSheetRepeat(sun, 24);

      const ringPlanet = createSpriteObject("/threeJs/home/ringPlanet.webp", {
        position: { y: -2 },
        scale: { x: 9.5, y: 9.5 * 0.5625 },
        // colour: spaceColour || undefined,
      });
      const icePlanet = createSpriteObject("/threeJs/home/icePlanet.webp", {
        position: { x: -10, y: 5, z: -11 },
        scale: { x: 6.5, y: 6.5 * 0.5625 },
        // colour: spaceColour || undefined,
      });
      const desertPlanet = createSpriteObject(
        "/threeJs/home/desertPlanet.webp",
        {
          position: { x: 10, y: 2.5, z: -11 },
          scale: { x: 7.5, y: 7.5 * 0.5625 },
          // colour: spaceColour || undefined,
        },
      );
      // const asteroidsObject = createAsteroidsObject();
      // const asteroidsGroup = createAsteroidsGroup(asteroidsObject);
      const stars = createStars(starsColour || undefined);

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

  return <div ref={backgroundRef} className={styles.reviewPageBackground} />;
};

export default ReviewPageBackground;

import React, { FC, useEffect, useRef } from "react";
import styles from "./ArticlesPageBackground.module.scss";
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
} from "../../../utils/threeJsBackgroundHelpers";

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const ArticlesPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { scene, camera, renderer } = initSpaceBackground(backgroundRef);

      const spaceClouds = createSpaceClouds(
        "/threeJs/homePageSpace.png",
        0x192545,
        camera,
      );
      const sun = createSpriteObject("/threeJs/sun.png", {
        position: { x: -11, y: -1, z: -10 },
        scale: { x: 18.5, y: 18.5 },
      });
      const ringPlanet = createSpriteObject(
        "/threeJs/articles/ringPlanet.webp",
        {
          position: { x: -22, y: -3, z: -11 },
          scale: { x: 7, y: 7 * 0.5625 },
        },
      );
      const icePlanet = createSpriteObject("/threeJs/articles/icePlanet.webp", {
        position: { x: -3, y: 3, z: -11 },
        scale: { x: 6.5, y: 6.5 * 0.5625 },
      });
      const desertPlanet = createSpriteObject(
        "/threeJs/articles/desertPlanet.webp",
        { position: { x: -3.65, y: -0.5 }, scale: { x: 8, y: 8 * 0.5625 } },
      );
      // const asteroidsObject = createAsteroidsObject();
      // const asteroidsGroup = createAsteroidsGroup(asteroidsObject);
      // asteroidsGroup.position.x = -11;
      // asteroidsGroup.position.y = -1;
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
        // rotateAsteroidBelt(asteroidsGroup);
        // rotateAsteroids(asteroidsObject);

        renderer.render(scene, camera);
        composer.render();

        requestAnimationFrame(renderScene);
      };

      renderScene();
    }
  }, []);

  return <div ref={backgroundRef} className={styles.articlesPageBackground} />;
};

export default ArticlesPageBackground;

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
} from "../../../utils/threeJsBackgroundHelpers";

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const PostsPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { scene, camera, renderer } = initSpaceBackground(backgroundRef);

      const spaceClouds = createSpaceClouds(
        "/threeJs/homePageSpace.png",
        0x595580,
        camera,
      );
      const sun = createSpriteObject("/threeJs/posts/sun.png", {
        position: { x: 10, y: 0, z: -10 },
        scale: { x: 17, y: 17 },
      });
      // const ringPlanet = createSpriteObject("/threeJs/home/ringPlanet.png", {
      //   position: { y: -1.75 },
      //   scale: { x: 5, y: 5 * 0.5625 },
      // });
      // const icePlanet = createSpriteObject("/threeJs/home/icePlanet.webp", {
      //   position: { x: -10, y: 5, z: -11 },
      //   scale: { x: 5, y: 5 * 0.5625 },
      // });
      // const desertPlanet = createSpriteObject(
      //   "/threeJs/home/desertPlanet.webp",
      //   { position: { x: 10, y: 2.5, z: -11 }, scale: { x: 5, y: 5 * 0.5625 } },
      // );
      const asteroidsObject = createAsteroidsObject();
      const asteroidsGroup = createAsteroidsGroup(asteroidsObject);
      const stars = createStars();

      scene.add(spaceClouds);
      scene.add(sun);
      // scene.add(ringPlanet);
      // scene.add(icePlanet);
      // scene.add(desertPlanet);
      scene.add(asteroidsGroup);
      stars.forEach(({ star }) => {
        scene.add(star);
      });

      const composer = createPostProcessing(scene, camera, renderer, sun);

      const renderScene = () => {
        scaleStars(stars);
        rotateSun(sun);
        rotateAsteroidBelt(asteroidsGroup);
        rotateAsteroids(asteroidsObject);

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

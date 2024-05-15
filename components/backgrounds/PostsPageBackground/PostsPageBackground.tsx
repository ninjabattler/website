import React, { FC, useEffect, useRef } from "react";
import styles from "./PostsPageBackground.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  SRGBColorSpace,
  Points,
  PointsMaterial,
  BufferGeometry,
  Float32BufferAttribute,
} from "three";

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
      const renderer = new WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      backgroundRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      // Set up the space skybox
      const spaceTexture = new TextureLoader().load("/threeJs/posts/space.png");
      spaceTexture.colorSpace = SRGBColorSpace;
      scene.background = spaceTexture;

      // scene.background = 0x202040;

      // Stars

      const stars = new Array(0);

      for (let i = 0; i < 250; i++) {
        const x = (Math.random() - 0.5) * 400;
        const y = (Math.random() - 0.5) * 200;
        const z = -100;

        stars.push(x, y, z);
      }

      const starsGeometry = new BufferGeometry();

      starsGeometry.setAttribute(
        "position",
        new Float32BufferAttribute(stars, 3),
      );

      const starsMaterial = new PointsMaterial({ color: 0xdddd44 });
      const starField = new Points(starsGeometry, starsMaterial);

      scene.add(starField);

      const renderScene = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      renderScene();
    }
  }, []);

  return <div ref={backgroundRef} className={styles.postsPageBackground} />;
};

export default PostsPageBackground;

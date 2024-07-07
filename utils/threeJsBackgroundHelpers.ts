import {
  Group,
  TextureLoader,
  Sprite,
  SpriteMaterial,
  Object3DEventMap,
  PlaneGeometry,
  SRGBColorSpace,
  MeshBasicMaterial,
  Mesh,
  ColorRepresentation,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
} from "three";
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
 * Creates and returns a sprite object with an SRGB colour space
 */
export const initSpaceBackground = (
  backgroundRef: React.RefObject<HTMLDivElement>,
): { scene: Scene; camera: PerspectiveCamera; renderer: WebGLRenderer } => {
  const scene = new Scene();
  scene.background = new Color(0x060909);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 0;
  camera.position.z = 5;

  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  backgroundRef.current?.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};

/**
 * Creates and returns an effect composer containing layers of post-processing effects
 */
export const createPostProcessing = (
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  sun: Sprite<Object3DEventMap>,
): EffectComposer => {
  // @ts-expect-error
  const sunRays = new GodRaysEffect(camera, sun, {
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

  return composer;
};

/**
 * Creates and returns an array of objects containing an asteroid sprite for three js and a rotation speed variable
 */
export const createAsteroidsObject = (): ThreeJSBackgroundAsteroids => {
  const asteroidMap = new TextureLoader().load(
    "/threeJs/general/asteroid.webp",
  );
  asteroidMap.colorSpace = SRGBColorSpace;
  const asteroid2Map = new TextureLoader().load(
    "/threeJs/general/asteroid2.webp",
  );
  asteroid2Map.colorSpace = SRGBColorSpace;
  const asteroid3Map = new TextureLoader().load(
    "/threeJs/general/asteroid3.webp",
  );
  asteroid3Map.colorSpace = SRGBColorSpace;
  const asteroid4Map = new TextureLoader().load(
    "/threeJs/general/asteroid4.webp",
  );
  asteroid4Map.colorSpace = SRGBColorSpace;

  const asteroidMaps = [asteroidMap, asteroid2Map, asteroid3Map, asteroid4Map];

  const asteroids: ThreeJSBackgroundAsteroids = [];

  for (let i = 0; i <= 750; i++) {
    const asteroidSize = Math.random() * 3;

    const asteroidMaterial = new SpriteMaterial({
      map: asteroidMaps[Math.floor(Math.random() * 4)],
      alphaHash: true,
    });

    const asteroid = new Sprite(asteroidMaterial);
    const asteroidPositionOffset = Math.random() * 360;

    asteroid.position.x =
      Math.cos(asteroidPositionOffset) * 75 + Math.random() * 10;
    asteroid.position.y = -5 + Math.random() * 10;
    asteroid.position.z =
      Math.sin(asteroidPositionOffset) * 75 + Math.random() * 10;
    asteroid.scale.x = asteroidSize;
    asteroid.scale.y = asteroidSize;
    asteroidMaterial.rotation = Math.random();

    asteroids.push({
      rotationSpeed: -0.005 + Math.random() * 0.01,
      asteroid,
    });
  }

  return asteroids;
};

/**
 * Creates and returns a three js group object from an array of asteroid sprites
 */
export const createAsteroidsGroup = (
  asteroids: ThreeJSBackgroundAsteroids,
): Group<Object3DEventMap> => {
  const asteroidsGroup = new Group();

  asteroids.forEach(({ asteroid }) => {
    asteroidsGroup.add(asteroid);
  });

  return asteroidsGroup;
};

/**
 * Modify's an asteroid sprite's rotation using it's given rotationSpeed
 */
export const rotateAsteroids = (
  asteroids: ThreeJSBackgroundAsteroids,
): void => {
  asteroids.forEach((asteroidObject) => {
    asteroidObject.asteroid.material.rotation += asteroidObject.rotationSpeed;
  });
};

/**
 * Creates a plane object with a given texture & color, that looks at a given camera
 */
export const createSpaceClouds = (
  texture: string,
  color: ColorRepresentation | undefined,
  camera: PerspectiveCamera,
): Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap> => {
  const spaceCloudsGeometry = new PlaneGeometry(400, 225);
  const spaceMap = new TextureLoader().load(texture);
  spaceMap.colorSpace = SRGBColorSpace;
  const spaceCloudsMaterial = new MeshBasicMaterial({
    map: spaceMap,
    color: color,
    transparent: true,
  });

  const spaceClouds = new Mesh(spaceCloudsGeometry, spaceCloudsMaterial);

  spaceClouds.position.z = -100;
  spaceClouds.position.y = 0;
  spaceClouds.lookAt(camera.position);

  return spaceClouds;
};

/**
 * Creates and returns an array of objects containing a star sprite for three js and a boolean to determine if it should scale up or down
 */
export const createStars = (): ThreeJSBackgroundStars => {
  const stars: ThreeJSBackgroundStars = [];
  const starMap = new TextureLoader().load("/threeJs/posts/star.png");
  starMap.colorSpace = SRGBColorSpace;
  const starMaterial = new SpriteMaterial({
    map: starMap,
  });

  for (let i = 0; i < 250; i++) {
    const star = new Sprite(starMaterial);
    const starScale = 2 + Math.random() * 2;

    star.position.x = (Math.random() - 0.5) * 600;
    star.position.y = (Math.random() - 0.5) * 300;
    star.position.z = -150 - Math.random() * 50;
    star.scale.x = starScale;
    star.scale.y = starScale;

    stars.push({ scaleUp: true, star });
  }

  return stars;
};

/**
 * Modify's a star sprite's scale based on it's scaleUp variable
 */
export const scaleStars = (stars: ThreeJSBackgroundStars): void => {
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
};

/**
 * Creates and returns a sprite object with an SRGB colour space
 */
export const createSpriteObject = (
  texture: string,
  settings?: {
    position?: XYZCoordinates;
    rotation?: XYZCoordinates;
    scale?: XYZCoordinates;
  },
): Sprite<Object3DEventMap> => {
  const map = new TextureLoader().load(texture);
  map.colorSpace = SRGBColorSpace;
  const material = new SpriteMaterial({
    map: map,
    alphaHash: true,
  });
  const sprite = new Sprite(material);

  if (settings) {
    if (settings.position) {
      sprite.position.x = settings.position.x || 0;
      sprite.position.y = settings.position.y || 0;
      sprite.position.z = settings.position.z || 0;
    }

    if (settings.rotation) {
      sprite.rotation.x = settings.rotation.x || 0;
      sprite.rotation.y = settings.rotation.y || 0;
      sprite.rotation.z = settings.rotation.z || 0;
    }

    if (settings.scale) {
      sprite.scale.x = settings.scale.x || 0;
      sprite.scale.y = settings.scale.y || 0;
    }
  }

  return sprite;
};

/**
 * Modify's a group of asteroid's y rotation
 */
export const rotateAsteroidBelt = (asteroidBelt: Group): void => {
  asteroidBelt.rotation.y -= 0.00005;
};

/**
 * Modify's the rotation of a sun object's material
 */
export const rotateSun = (sun: Sprite<Object3DEventMap>): void => {
  sun.material.rotation += 0.0005;
};

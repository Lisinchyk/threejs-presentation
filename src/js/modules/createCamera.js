'use strict';

import { PerspectiveCamera } from "three";

export class Camera {
    static perspective = (container = window) => {
        const { innerWidth, innerHeight } = container;

        const fov = 45;
        const aspect = innerWidth / innerHeight;
        const near = 1;
        const far = 15000;
        const camera = new PerspectiveCamera(fov, aspect, near, far);

        camera.position.set(0, 0,500);

        return camera;
    }
};
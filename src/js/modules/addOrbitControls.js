'use strict';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Controls {
    constructor() {
        let controls = null;
    }

    static create(camera, canvas) {
        this.controls = new OrbitControls(camera, canvas);
        this.controls.update();

        return this.controls;
    }

    static setup() {
        this.controls.update();
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enablePan = false;
        this.controls.enableZoom = true;
        this.controls.minDistance = 3;
        this.controls.maxDistance = 500;
    }

    static rotate(enabled = false, speed = 2) {
        this.controls.autoRotate = enabled;
        this.controls.autoRotateSpeed = speed;
    }

    static limiters() {
        this.controls.minPolarAngle = Math.PI * -0.5 + 2;
        this.controls.minPolarAngle = Math.PI / 2.5;
        this.controls.maxPolarAngle = Math.PI/2.5;
        this.controls.minAzimuthAngle = Math.PI * 1.7;
        this.controls.maxAzimuthAngle = - Math.PI * 1.7;
    }

    static disable(option = false) {
        this.controls.enabled = option;
    }
}

'use strict';

import {
    DynamicDrawUsage,
    Euler, Group,
    InstancedMesh,
    Matrix4,
    Mesh,
    Color,
    MeshPhongMaterial,
    Quaternion,
    SphereGeometry,
    Vector3
} from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { lazyLoadingData } from "@js/modules/functions";
import {gui} from "@js/helpers/gui-helper";

export const createElement = ({ data }) => {


    const proteinGroup = new Group();
    proteinGroup.rotation.set(-0.63, -1.48, -1.47);
    proteinGroup.name = 'proteinGroup';

    // let isInstance = true;
    let isInstance = false;

    const geometry = new SphereGeometry( data[0].radius, 15, 15 );

    if (isInstance) {
        const sphere = new Mesh( geometry, new MeshPhongMaterial({color: data[0].color, shininess: 0}));
        sphere.scale.set(1.28, 1.28, 1.28);

        const rotation = new Euler(sphere.rotation.x, sphere.rotation.y, sphere.rotation.z, 'XYZ');
        const rotationQ = new Quaternion().setFromEuler(rotation);
        const matrix = new Matrix4();
        const scale = new Vector3(sphere.scale.x, sphere.scale.y, sphere.scale.z);
        let position;
        const count = data.length;

        const instance = new InstancedMesh(sphere.geometry, sphere.material, count);
        instance.instanceMatrix.setUsage(DynamicDrawUsage);

        for (let i = 0; i < count; i++) {
            const {x, y, z} = data[i].position;

            position = new Vector3(x, y, z);
            matrix.compose(position, rotationQ, scale);
            instance.setMatrixAt(i, matrix);
            instance.setColorAt(i, new Color(data[i].color.r, data[i].color.g, data[i].color.b));
        }

        proteinGroup.add(instance);
    } else {
        for (let sphere of data) {
            const { color: {r, g, b}, position: {x, y, z} } = sphere;
            const scale = 1.28;

            const mesh = new Mesh(geometry, new MeshPhongMaterial({shininess: 0}));

            mesh.position.set(x, y, z);
            mesh.scale.set(scale, scale, scale);
            mesh.material.color.setRGB(r, g, b);

            proteinGroup.add(mesh);
        }
    }

    console.log(proteinGroup);

    return proteinGroup;
}

export const loadElement = (url) => {
    return lazyLoadingData(new OBJLoader(), url);
}
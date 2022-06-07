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
    Vector3, BoxBufferGeometry, TextureLoader
} from "three";

import {ENV_THREEJS, GUI_CONFIG} from "@js/constants";
import {removeObjectsFromScene} from "@js/helpers/remove-objects";
import {Renderer} from "@js/modules/createRender";
import {lazyLoadingData} from "@js/helpers/loading-data";

export const createElement = ({ data }) => {
    const { isInstance, isModelLoaded, isBufferGeometry, isCubeLoaded } = GUI_CONFIG;

    removeObjectsFromScene('proteinGroup');
    Renderer.clear();

    if (isCubeLoaded) {
        return createBox();
    }

    if (isInstance || isModelLoaded || isBufferGeometry) {
        const proteinGroup = isInstance
            ? createInstanceObject(data)
            : createObject(data);

        console.log(proteinGroup);

        ENV_THREEJS.model = proteinGroup;

        return proteinGroup;
    }
}

const createGroup = (name, position) => {
    const { x, y, z } = position;

    const group = new Group();
    group.rotation.set(x, y, z);
    group.name = name;

    return group;
}

const createMesh = ({ radius, color, scale }) => {
    const sphere = new Mesh(
        new SphereGeometry( radius, 15, 15 ),
        new MeshPhongMaterial({color, shininess: 0})
    );

    sphere.scale.set(scale, scale, scale);

    return sphere;
}

const createBox = async () => {
    const size = 150;

    const texture = await lazyLoadingData(new TextureLoader(), "assets/download.png");
    console.log(texture);

    const proteinGroup = createGroup('proteinGroup', { x: -0.63, y: -1.48, z: -1.47 });

    const geometry = new BoxBufferGeometry(size, size, size);
    const material = new MeshPhongMaterial({color: 'lightblue', map: texture});
    // material.map = texture;

    const box = new Mesh(geometry, material);

    proteinGroup.add(box);

    ENV_THREEJS.model = proteinGroup;

    console.log(proteinGroup);

    return proteinGroup;
}

const createInstanceObject = (data) => {
    const proteinGroup = createGroup('proteinGroup', { x: -0.63, y: -1.48, z: -1.47 });

    const sphere = createMesh({
        radius: data[0].radius,
        color: data[0].color,
        scale: 1.28
    });

    let position;
    const count = data.length;
    const { rotation, scale, geometry, material } = sphere;
    const rotationEuler = new Euler(rotation.x, rotation.y, rotation.z, 'XYZ');
    const rotationQ = new Quaternion().setFromEuler(rotationEuler);
    const matrix = new Matrix4();
    const scaleMesh = new Vector3(scale.x, scale.y, scale.z);

    const instance = new InstancedMesh(geometry, material, count);
    instance.instanceMatrix.setUsage(DynamicDrawUsage);

    for (let i = 0; i < count; i++) {
        const { x, y, z } = data[i].position;
        const { r, g, b } = data[i].color;

        position = new Vector3(x, y, z);
        matrix.compose(position, rotationQ, scaleMesh);
        instance.setMatrixAt(i, matrix);
        instance.setColorAt(i, new Color(r, g, b));
    }

    proteinGroup.add(instance);

    return proteinGroup;
}

const createObject = (data) => {
    const { isBufferGeometry } = GUI_CONFIG;
    const proteinGroup = createGroup('proteinGroup', { x: -0.63, y: -1.48, z: -1.47 });

    const geometry = isBufferGeometry
        ? new SphereGeometry( data[0].radius, 15, 15 )
        : null;

    const scale = 1.28;

    for (let sphere of data) {
        const { color: {r, g, b}, position: {x, y, z} } = sphere;


        const material = new MeshPhongMaterial({shininess: 0});

        const mesh = (geometry !== null)
            ? new Mesh(geometry, material)
            : createMesh({
                radius: sphere.radius,
                color: {r, g, b},
                scale
            });

        mesh.position.set(x, y, z);
        mesh.scale.set(scale, scale, scale);
        mesh.material.color.setRGB(r, g, b);

        proteinGroup.add(mesh);
    }

    return proteinGroup;
}

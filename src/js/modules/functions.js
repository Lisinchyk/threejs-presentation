'use strict';

export const onWindowResize = (camera, renderer, mainContainer = window) => {
    const { innerWidth, innerHeight } = mainContainer;

    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( innerWidth, innerHeight );
}

export const rotateModel = (renderer, scene, camera, models) => {
    let time = Date.now();

    const rotate = () => {
        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;
        models.rotateZ(deltaTime * -0.00005);
        models.rotateX(deltaTime * 0.00003);
        models.rotateY(deltaTime * -0.00007);
        renderer.render(scene, camera);
        requestAnimationFrame(rotate);
    };

    rotate();

    return models;
}

export function lazyLoadingData(loader, url) {
    return new Promise((res, rej) => {
        loader.load(url, loadData => {
            res(loadData);
        });
    });
}
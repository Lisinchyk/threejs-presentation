"use strict";

export function lazyLoadingData(loader, url) {
    return new Promise((res, rej) => {
        loader.load(url, loadData => {
            res(loadData);
        });
    });
}
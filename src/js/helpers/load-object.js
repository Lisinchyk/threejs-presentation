'use strict';

import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { lazyLoadingData } from "@js/helpers/loading-data";

export const loadElement = (url) => {
    return lazyLoadingData(new OBJLoader(), url);
}
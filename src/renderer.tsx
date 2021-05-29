import * as React from "react";
import {AppInitializer} from "./app/AppInitializer";

try {
    AppInitializer.init();
} catch (error) {
    console.log(error);
}

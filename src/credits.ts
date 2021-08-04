import * as babylon from "babylonjs"

export class Credits {
    public static createScene(engine: babylon.Engine, canvas: HTMLCanvasElement): babylon.Scene {
        let scene: babylon.Scene = new babylon.Scene(engine);
        scene.clearColor = new babylon.Color4(232 / 255, 117 / 255, 0, 1);
        let camera: babylon.UniversalCamera = new babylon.UniversalCamera("cam", new babylon.Vector3(0, 0, 0), scene);
        return scene;
    }
}
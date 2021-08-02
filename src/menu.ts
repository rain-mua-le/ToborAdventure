import  * as babylon from "babylonjs"

export class Menu {
    public static createScene(engine: babylon.Engine, canvas: HTMLCanvasElement): babylon.Scene {
        let scene: babylon.Scene = new babylon.Scene(engine);
        var camera: babylon.ArcRotateCamera = new babylon.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, babylon.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        var light1: babylon.HemisphericLight = new babylon.HemisphericLight("light1", new babylon.Vector3(1, 1, 0), scene);
        var sphere: babylon.Mesh = babylon.MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        return scene;
    }
}
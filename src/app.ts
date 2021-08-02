import * as babylon from "babylonjs"
import {Menu} from "./menu"

enum State {MAIN_MENU = 0, INSTRUCTIONS = 1, CREDITS = 2, CUTSCENE = 3, CHOOSE_LEVEL = 4}

class App {
    private _scene: babylon.Scene;
    private _canvas: HTMLCanvasElement;
    private _engine: babylon.Engine;
    private _state: number = 0;

    constructor() {
        this._canvas = document.getElementById("render-canvas") as HTMLCanvasElement;
        this._engine = new babylon.Engine(this._canvas, true);
        this._scene = new babylon.Scene(this._engine);
        this._main();
    }

    private async _goToMainMenu(): Promise<void> {
        this._engine.displayLoadingUI();
        this._scene.detachControl();
        let scene = Menu.createScene(this._engine, this._canvas);
        await scene.whenReadyAsync();
        this._engine.hideLoadingUI();
        this._scene.dispose();
        this._scene = scene;
        this._state = State.MAIN_MENU;
    }

    private async _main(): Promise<void> {
        await this._goToMainMenu();
        this._engine.runRenderLoop(() => {
            switch (this._state) {
                case State.MAIN_MENU:
                    this._scene.render();
                    break;
                default: break;
            }
        });
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

new App();
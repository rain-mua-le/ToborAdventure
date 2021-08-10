import * as babylon from "babylonjs"
import "babylonjs-loaders"
import * as gui from "babylonjs-gui"

window.CANNON = require("cannon")

export class Tobor {
    public name: string;
    public maxSpeed: number = 5;
    public turnSpeed: number = 2.5;
    public mass: number = 10;
    public friction: number = 5;
    public bounce: number = 0.8;
    public horizontalAxis: number = 0;
    public verticalAxis: number = 0;
    private moveAmount: number = 0;
    private turnAmount: number = 0;
    private delta: number = 0.001;

    public constructor(engine: babylon.Engine, scene: babylon.Scene, canvas: HTMLCanvasElement, cam: babylon.ArcRotateCamera, n: string) {
        this.name = n;
        babylon.SceneLoader.ImportMesh("", "./assets/models/", "tobor.glb", scene, (newMeshes: babylon.AbstractMesh[]) => {
            let toborMesh = newMeshes[1];
            toborMesh.position.y = 2;
            cam.parent = toborMesh;
            let gravityVector: babylon.Vector3 = new babylon.Vector3(0, -9.81, 0);
            let physicsPlugin: babylon.CannonJSPlugin = new babylon.CannonJSPlugin();
            scene.enablePhysics(gravityVector, physicsPlugin);
            toborMesh.parent = null;
            let physics = new babylon.PhysicsImpostor(toborMesh, babylon.PhysicsImpostor.BoxImpostor, {
                mass: this.mass,
                friction: this.friction,
                restitution: this.bounce
            }, scene);
            let particleSystem = new babylon.ParticleSystem("trail", 500, scene);
            particleSystem.particleTexture = new babylon.Texture("./assets/textures/window_04.png", scene);
            particleSystem.emitter = toborMesh;
            particleSystem.isLocal = true;
            particleSystem.minSize = 0.1;
            particleSystem.maxSize = 0.5;
            particleSystem.color1 = new babylon.Color4(232 / 255, 117 / 255, 0, 1);
            particleSystem.color2 = new babylon.Color4(18 / 255, 71 / 255, 52 / 255, 1);
            particleSystem.colorDead = new babylon.Color4(95 / 255, 244 / 255, 183 / 255, 1);
            particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 3;
            particleSystem.emitRate = 250;
            particleSystem.worldOffset = new babylon.Vector3(0, 1, 1);
            scene.onKeyboardObservable.add((e: babylon.KeyboardInfo) => {
                if (e.type == babylon.KeyboardEventTypes.KEYDOWN) {
                   switch(e.event.key) {
                    case "w":
                        if (this.verticalAxis < 1) {
                            this.verticalAxis += this.delta;
                        }
                        this.moveIt(toborMesh, engine);
                        particleSystem.start();
                        break;
                    case "a":
                        if (this.horizontalAxis > -1) {
                            this.horizontalAxis -= this.delta;
                        }
                        this.moveIt(toborMesh, engine);
                        particleSystem.start();
                        break;
                    case "s":
                        if (this.verticalAxis > -1) {
                            this.verticalAxis -= this.delta;
                        }
                        this.moveIt(toborMesh, engine);
                        particleSystem.start();
                        break;
                    case "d":
                        if (this.horizontalAxis < 1) {
                            this.horizontalAxis += this.delta;
                        }
                        this.moveIt(toborMesh, engine);
                        particleSystem.start();
                        break;
                    case "j":
                        break;
                    default: break;
                    }
                }
                else if (e.type == babylon.KeyboardEventTypes.KEYUP) {
                   switch(e.event.key) {
                    case "w":
                        this.verticalAxis = 0;
                        particleSystem.stop();
                        break;
                    case "a":
                        this.horizontalAxis = 0;
                        particleSystem.stop();
                        break;
                    case "s":
                        this.verticalAxis = 0;
                        particleSystem.stop();
                        break;
                    case "d":
                        this.horizontalAxis = 0;
                        particleSystem.stop();
                        break;
                    case "j":
                        break;
                    default: break;
                    }
                }
            });
        });
    }

    private getMeshPositionOnScreen(scene: babylon.Scene, canvas: HTMLCanvasElement, mesh: babylon.AbstractMesh) {
        let pos = babylon.Vector3.Project(mesh.position, babylon.Matrix.Identity(), scene.getTransformMatrix(), new babylon.Viewport(0, 0, canvas.width, canvas.height));
        return {
            x: (Math.trunc(Math.round(pos.x) * 1) / 1),
            y: (Math.trunc(Math.round(pos.y) * 1) / 1)
        };
    }

    private calculateMoveAmount(): void {
        this.moveAmount = this.verticalAxis * this.maxSpeed;
    }

    private calculateTurnAmount(): void {
        this.turnAmount = this.horizontalAxis * this.turnSpeed;
    }

    private moveIt(tobor: babylon.AbstractMesh, engine: babylon.Engine): void {
        this.calculateMoveAmount();
        this.calculateTurnAmount();
        /*
        tobor.position = tobor.position.add(new babylon.Vector3(0, 0, 1).scale(this.moveAmount).scale(engine.getDeltaTime()));
        if (this.moveAmount != 0) {
            tobor.rotation = tobor.rotation.add(new babylon.Vector3(1, 0, 0).scale(this.turnAmount).scale(engine.getDeltaTime()));
        }
        */
       tobor.translate(babylon.Axis.Z, this.moveAmount * engine.getDeltaTime(), babylon.Space.LOCAL);
       if (this.moveAmount != 0) {
           //tobor.rotate(babylon.Axis.Z, this.turnAmount * engine.getDeltaTime(), babylon.Space.LOCAL);
           tobor.rotation.y = this.turnAmount * engine.getDeltaTime();
       }
    }
}
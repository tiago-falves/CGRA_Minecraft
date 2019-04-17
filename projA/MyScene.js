/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        this.enableTex = true;

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(this.enableTex);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.house = new MyHouse(this);
        this.treeRowPatch = new MyTreeRowPatch(this, 1.5, 0.25, 1.5, 1);
        this.treeGroupPatch = new MyTreeGroupPatch(this, 1.5, 0.25, 1.5, 1);
        this.voxelHill = new MyVoxelHill(this,7,'images/hill.jpg');
        this.voxelHill1 = new MyVoxelHill(this,5,'images/hill2.jpg');

        this.cubeMap = new MyCubeMap(this,50,'images/mp_deviladv/devils_advocate_ft.png', 'images/mp_deviladv/devils_advocate_bk.png', 'images/mp_deviladv/devils_advocate_lf.png', 'images/mp_deviladv/devils_advocate_rt.png', 'images/mp_deviladv/devils_advocate_up.png', 'images/mp_deviladv/devils_advocate_dn.png');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMyHouse = true;
        this.displayMyTree = true;
        this.displayMyVoxelHill = true;
        this.displayTreeGroupPatch = true;
        this.displayTreeRowPatch = true;
        this.displayCubeMap = true;

    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
        //this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
       
        if(this.displayTreeRowPatch){
            this.pushMatrix();
            this.translate(10,-1, 0.0);
            this.treeRowPatch.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(0,-1, -10.0);
            this.rotate(90*Math.PI/180,0,1,0);
            this.treeRowPatch.display();
           
            this.popMatrix();
        }
    
        if(this.displayTreeGroupPatch){
            this.pushMatrix();
            this.translate(-0,-1, -18);
            this.treeGroupPatch.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(-14,-1, -8);
            this.treeGroupPatch.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(-12,-1, -18);
            this.treeGroupPatch.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(19,-1, -9);
            this.treeGroupPatch.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(19,-1,3);
            this.treeGroupPatch.display();
            
            this.popMatrix();
        }

        if (this.displayMyHouse){
            this.pushMatrix();

            this.translate(0, -1, 0)
            
            this.house.display();

            this.popMatrix();
        }

        if(this.displayMyVoxelHill){
            this.pushMatrix();
            this.translate(10,-0.5, -15.0);
            this.voxelHill.display();
            
            this.popMatrix();

            this.pushMatrix();
            this.translate(-20,-0.5, 15);
            this.voxelHill.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(5,-0.5, 22);
            this.voxelHill1.display();
            this.popMatrix();
        }

        if(this.displayCubeMap){
            this.pushMatrix();
            this.translate(0.0,23, 0.0);
            this.cubeMap.display();
            this.popMatrix();
            
        }      
    }
}
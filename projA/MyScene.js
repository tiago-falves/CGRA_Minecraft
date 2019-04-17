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
        this.voxelHill = new MyVoxelHill(this,6,'images/hill.jpg');
        this.voxelHill1 = new MyVoxelHill(this,4,'images/hill2.jpg');
        this.floor = new MyQuad(this,[0, 10,10, 10,0, 0,10, 0]);

        this.cubeMap = new MyCubeMap(this,200,'images/mp_deviladv/devils_advocate_ft.png', 'images/mp_deviladv/devils_advocate_bk.png', 'images/mp_deviladv/devils_advocate_lf.png', 'images/mp_deviladv/devils_advocate_rt.png', 'images/mp_deviladv/devils_advocate_up.png', 'images/mp_deviladv/devils_advocate_dn.png');

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMyHouse = true;
        this.displayMyTree = true;
        this.displayMyVoxelHill = true;
        this.displayTreeGroupPatch = true;
        this.displayTreeRowPatch = true;
        this.displayCubeMap = true;
        this.displayFloor = true;
        this.lightSelected = 0;

        this.lightsType = ['Day Light', 'Night Light'];

        this.lightsId = { 'Day Light' : 0, 'Night Light' : 1};
        this.initMaterials();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    initMaterials() {
        //Front
        this.floorMaterial = new CGFappearance(this);
        this.floorMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.floorMaterial.setDiffuse(1, 1, 1, 1);
        this.floorMaterial.setSpecular(0, 0, 0, 1);
        this.floorMaterial.setShininess(10.0);
        this.floorMaterial.loadTexture('images/floor.jpg');
        this.floorMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }


    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        // Position for the 3 lights
        this.lights[0].setPosition(5, 30, 5, 1);
        this.lights[1].setPosition(5, 30 , 5, 1);
        this.lights[2].setPosition(0, 2, 0);
        
        this.lights[0].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        this.lights[1].setAmbient(0.1, 0.1, 1, 1.0);
        this.lights[1].setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.lights[1].setConstantAttenuation(1.5);
        this.lights[1].update();

        this.lights[2].setAmbient(1, 1, 1, 1.0);
        this.lights[2].setDiffuse(1, 1, 1, 1);
        //this.lights[2].setQuadraticAttenuation(2);
        //this.lights[2].setSpotExponent(1);
        this.lights[2].setVisible(true);
        this.lights[2].enable();
        this.lights[2].update();
    }

    chooseLights() {

        if (this.lightsType[this.lightSelected] == 'Day Light') {
            this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

            this.lights[1].disable();
            this.lights[1].update();

            this.lights[2].disable();
            this.lights[2].update();

            this.lights[0].enable();
            this.lights[0].update();
        }

        else if (this.lightsType[this.lightSelected] == 'Night Light') {
            this.setGlobalAmbientLight(0.6196, 0.6745, 0.898, 1.0);

            this.lights[0].disable();
            this.lights[0].update();

            this.lights[1].enable();
            this.lights[1].update();

            this.lights[2].enable();
            this.lights[2].update();

        }
    }

    updateLights(){
        for (var i = 0; i < this.lights.length; i++){
            this.lights[i].update();
        }
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

        this.enableTextures(this.enableTex);
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
        //this.setDefaultAppearance();

        //Update Lights
        this.lights[this.lightSelected].update();
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

            //this.translate(0, -1, 0)
            
            this.house.display();
            this.popMatrix();
        }

        if(this.displayMyVoxelHill){
            this.pushMatrix();
            this.translate(15,-0.5, -19.0);
            this.voxelHill.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(-20,-0.5, 15);
            this.voxelHill.display();
            this.popMatrix();

            this.pushMatrix();
            this.translate(15,-1, 19);
            this.voxelHill1.display();
            this.popMatrix();
        }

        if(this.displayCubeMap){
            this.pushMatrix();
            //this.translate(0.0,24, 0.0);
            this.cubeMap.display();
            this.popMatrix();
        }      
        if (this.displayFloor){
            this.pushMatrix();
            this.translate(0.0, -0.5, 0.0);
            this.rotate(-Math.PI / 2, 1.0, 0.0, 0.0);
            this.scale(50,50,50);
            this.floorMaterial.apply();
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.floor.display();
            this.popMatrix();
        }
    }
}
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
        this.voxelHill_1 = new MyVoxelHill(this, 7,'images/hill.jpg');
        this.voxelHill_2 = new MyVoxelHill(this, 5,'images/hill2.jpg');
        this.lantern = new MyLantern(this);
        this.cubeMapDay = new MyCubeMap(this, 65, 'images/hills_ft.png', 'images/hills_bk.png', 'images/hills_lf.png', 'images/hills_rt.png', 'images/hills_up.png', 'images/hills_dn.png');
        this.cubeMapNight = new MyCubeMap(this, 65, 'images/purplenebula_ft.png', 'images/purplenebula_bk.png', 'images/purplenebula_lf.png', 'images/purplenebula_rt.png', 'images/purplenebula_up.png', 'images/purplenebula_dn.png' )
        this.terrain = new MyQuad(this,[0, 10,10, 10,0, 0,10, 0]);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMyHouse = true;
        this.displayMyTree = true;
        this.displayMyVoxelHill = true;
        this.displayTreeGroupPatch = true;
        this.displayTreeRowPatch = true;
        this.displayCubeMap = true;
        this.displayTerrain = true;
        this.lightSelected = 0;

        this.lightsType = ['Day Light', 'Night Light'];

        this.lightsId = { 'Day Light' : 0, 'Night Light' : 1};

        this.initMaterials();
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 50, 30), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    initMaterials() {
        //Material to be applied to terrain
        this.terrainMaterial = new CGFappearance(this);
        this.terrainMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.terrainMaterial.setDiffuse(1, 1, 1, 1);
        this.terrainMaterial.setSpecular(0, 0, 0, 1);
        this.terrainMaterial.setShininess(10.0);
        this.terrainMaterial.loadTexture('images/hills_dn.png');
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }


    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 1.0);

        // Position for the 3 lights
        this.lights[0].setPosition(5, 30, 5, 1);        //Light to be used during the day
        this.lights[1].setPosition(5, 30 , 5, 1);       //Light to be used during the night
        this.lights[2].setPosition(3, 0, 3);           //Light to be used to represent the lantern
        
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
        this.lights[2].setSpecular(1, 1, 1, 1);
        this.lights[2].setQuadraticAttenuation(2);
        this.lights[2].setSpotExponent(1);
        this.lights[2].setVisible(true);
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

        //Update Lights
        this.lights[this.lightSelected].update();

        // ---- BEGIN Primitive drawing section

        //Displaying the Terrain Plain
        this.pushMatrix();
        
        this.translate(0.0, -0.5, 0.0);
        
        this.rotate(-Math.PI / 2, 1.0, 0.0, 0.0);
        
        this.scale(65,65,65);
        
        this.terrainMaterial.apply();
        
        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        
        this.terrain.display();
        
        this.popMatrix();
       
        //Displaying the First Tree Row
        this.pushMatrix();
        
        this.translate(0, 0, 24);
        
        this.rotate(Math.PI/2, 0, 1, 0);
        
        this.treeRowPatch.display();
        
        this.popMatrix();

        //Displaying the Second Tree Row
        this.pushMatrix();
        
        this.translate(0, 0, 20);
        
        this.rotate(Math.PI/2, 0, 1, 0);
        
        this.treeRowPatch.display();
        
        this.popMatrix();
        
        //Displaying the First Tree Group
        this.pushMatrix();
        
        this.translate(0, 0, -18);
        
        this.treeGroupPatch.display();
        
        this.popMatrix();

        //Displaying the Second Tree Group
        this.pushMatrix();
        
        this.translate(-15,0, -8);
        
        this.treeGroupPatch.display();
        
        this.popMatrix();

        //Displaying the Third Tree Group
        this.pushMatrix();
        
        this.translate(-20,0, -18);
        
        this.treeGroupPatch.display();
        
        this.popMatrix();

        //Displaying the Forth Tree Group
        this.pushMatrix();
        
        this.translate(19,0, 0);
        
        this.treeGroupPatch.display();
        
        this.popMatrix();
        
        //Displaying the Fifth Trre Group
        this.pushMatrix();
        
        this.translate(19,0,15);
        
        this.treeGroupPatch.display();
        
        this.popMatrix();
        
        //Displaying the House
        this.pushMatrix();

        this.translate(0, 1, 0);
            
        this.house.display();
        
        this.popMatrix();
        
        //Displaying the First Voxel Hill
        this.pushMatrix();
            
        this.translate(25, 0, -25.0);
        
        this.voxelHill_1.display();
        
        this.popMatrix();

        //Displaying the Second Voxel Hill
        this.pushMatrix();

        this.translate(-20, 0, 15);
        
        this.voxelHill_1.display();
        
        this.popMatrix();

        //Displaying the Third Voxel Hill
        this.pushMatrix();
        
        this.translate(15, 0, 22);
        
        this.voxelHill_2.display();
        
        this.popMatrix();
        
        //Displaying Map Cube if Day Light is Selected
        if (this.lightSelected == 0){
            this.pushMatrix();

            this.translate(0.0, 24, 0.0);

            this.cubeMapDay.display();

            this.popMatrix();
            
        }
        //Displaying Map Cube if Night Light is Selected 
        else {
            this.pushMatrix();

            this.translate(0.0, 24, 0.0);

            this.cubeMapNight.display();

            this.popMatrix();
        }    
        
        //Displaying the Lantern
        this.pushMatrix();

        this.translate(3, 0 , 3);

        this.lantern.display();

        this.popMatrix();
    }
}
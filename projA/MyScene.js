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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        //this.house = new MyHouse(this);
        //this.prism = new MyPrism(this, 4, 4, 2 , 2);
        //this.cylinder = new MyCylinder(this, 20, 4, 2, 2);
        this.tree = new MyTree(this, 2, 1, 2.5, 1);
        this.treePatch = new MyTreeRowPatch(this, 1.5, 0.25, 1.5, 1);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayMyHouse = true;
        this.displayMyTree = true;

         //Testing Material to use to test TexCoords
        this.testingMaterial = new CGFappearance(this);
        this.testingMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.testingMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.testingMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.testingMaterial.setShininess(10.0);
        this.testingMaterial.loadTexture('images/test.jpg');
        this.testingMaterial.setTextureWrap('REPEAT', 'REPEAT');
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
       // this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
       

        this.treePatch.display();
        //this.tree.display();
       /* if (this.displayMyHouse)
            this.house.display();

    
      
        this.testingMaterial.apply();

        this.cylinder.display();*/
        // ---- END Primitive drawing section
    }
}
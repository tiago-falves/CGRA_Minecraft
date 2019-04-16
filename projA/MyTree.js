/**
* MyTree
* @constructor
*/

class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius/*, trunkTexture, treeTopTexture*/){
        super(scene);
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        this.initMaterials();
        //this.treeTopTexture = treeTopTexture;
      //  this.trunkTexture = trunkTexture;

        //Initializing MyTree Objects
        this.trunk = new MyCylinder(this.scene, 10, 10, trunkHeight, 0.5);
        this.cone = new MyCone(this.scene, 10, 10, treeTopHeight, treeTopRadius);
    }

    initMaterials() {
		this.materialGreen = new CGFappearance(this.scene);
		this.materialGreen.setAmbient(0.0, 0.0, 0.0, 1.0);
		this.materialGreen.setDiffuse(0.215, 0.988, 0.113, 1.0);
		this.materialGreen.setSpecular(0.215, 0.988, 0.113, 1.0);
        this.materialGreen.setShininess(10.0);
    }
    display(){

        //Trunk Displaying
        
        this.trunk.display();
        
        //Cone Displaying
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0)
        this.materialGreen.apply();
        this.cone.display();

        this.scene.popMatrix();
        
    }
}
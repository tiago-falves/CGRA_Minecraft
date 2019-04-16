/**
* MyTree
* @constructor
*/

class MyTree extends CGFobject {
    constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius){
        super(scene);
        this.trunkHeight = trunkHeight;
        this.trunkRadius = trunkRadius;
        this.treeTopHeight = treeTopHeight;
        this.treeTopRadius = treeTopRadius;
        
        //this.treeTopTexture = treeTopTexture;
        //this.trunkTexture = trunkTexture;

        //Initializing MyTree Objects
        this.trunk = new MyCylinder(this.scene, 10, 10, trunkHeight, 0.5);
        this.cone = new MyCone(this.scene, 10, 10, treeTopHeight, treeTopRadius);
    }

    
    display(){

        //Trunk Displaying
        
        this.trunk.display();
        
        //Cone Displaying
        this.scene.pushMatrix();
        this.scene.translate(0, this.trunkHeight, 0)
        this.cone.display();
        this.scene.popMatrix();
        
    }
}
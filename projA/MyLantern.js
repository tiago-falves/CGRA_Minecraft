/**
* MyLantern
* @constructor
*/

class MyLantern extends CGFobject {
    constructor(scene){
        super(scene);

        //Initializing MyLantern Objects
        this.lamp = new MyCylinder(this.scene, 18, 8, 0.5, 0.15);
        this.prism = new MyPrism(this.scene, 8, 8, 0.5, 0.025);
        this.base = new MyQuad(this.scene);
    }
    initMaterials() {

        //Texture Leaves
        this.leavesMaterial = new CGFappearance(this.scene);
        this.leavesMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.leavesMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.leavesMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.leavesMaterial.setShininess(10.0);
        this.leavesMaterial.loadTexture(this.treeTopTexture); 
        this.leavesMaterial.setTextureWrap('REPEAT', 'REPEAT');

        //Texture Leaves
        this.trunkMaterial = new CGFappearance(this.scene);
        this.trunkMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.trunkMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.trunkMaterial.setSpecular(0, 0, 0, 1);
        this.trunkMaterial.setShininess(10.0);
        this.trunkMaterial.loadTexture(this.truncTexture); 
        this.trunkMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    
    display(){

        //Lamp Displaying
        this.scene.pushMatrix();
        
        this.lamp.display();
        
        this.scene.popMatrix();
        
        //Prism 1 Displaying
        this.scene.pushMatrix();
        
        this.scene.translate(0.25 + 0.05, 0, 0);

        this.prism.display();
        
        this.scene.popMatrix();

        //Prism 2 Displaying
        this.scene.pushMatrix();

        this.scene.translate(-0.25 - 0.05, 0, 0);

        this.prism.display();

        this.scene.popMatrix();

        //Prism 3 Displaying
        this.scene.pushMatrix();

        this.scene.translate(0, 0, 0.25 + 0.05);

        this.prism.display();

        this.scene.popMatrix();

        //Prism 4 Displaying
        this.scene.pushMatrix();

        this.scene.translate(0, 0, -0.25 - 0.05);

        this.prism.display();

        this.scene.popMatrix();

        //Lower Base displaying
        this.scene.pushMatrix();

        this.scene.scale(0.70, 0.70, 0.70);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.base.display();

        this.scene.popMatrix();

        //Upper Base displaying
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);

        this.scene.scale(0.70, 0.70, 0.70);

        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.base.display();

        this.scene.popMatrix();
        
    }
}
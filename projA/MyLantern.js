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

        this.initMaterials();
    }

    initMaterials() {

        //Metalic Texture for the Extirios of the Lantern
        this.metalicMaterial = new CGFappearance(this.scene);
        this.metalicMaterial.setAmbient(0.25, 0.25, 0.25, 1);
        this.metalicMaterial.setDiffuse(0.25, 0.25, 0.25, 1);
        this.metalicMaterial.setSpecular(1, 1, 1, 1);
        this.metalicMaterial.setShininess(10.0);
    
        //TMaterial for the Lamp
        this.lampMaterial = new CGFappearance(this.scene);
        this.lampMaterial.setAmbient(0.792, 0.7333, 0.2117, 1);
        this.lampMaterial.setDiffuse(0.792, 0.7333, 0.2117, 1);
        this.lampMaterial.setSpecular(0, 0, 0, 1);
        this.lampMaterial.setShininess(10.0);
    }

    
    display(){


        //Lamp Displaying
        this.scene.pushMatrix();
        
        this.lampMaterial.apply();

        this.lamp.display();
        
        this.scene.popMatrix();
        
        //Aplying Metalic Material
        this.scene.pushMatrix();

        this.metalicMaterial.apply();

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
        
        this.scene.popMatrix();
    }
}
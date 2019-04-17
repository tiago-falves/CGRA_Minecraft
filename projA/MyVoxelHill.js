/**
 * MyVoxelHill
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyVoxelHill extends CGFobject {
	constructor(scene,levels,hillTexture) {
        super(scene);
        this.hillTexture = hillTexture;
        
        this.levels = levels;

        //Initialize MyUnitCubeQuad objects
        this.cube = new MyUnitCubeQuad(this.scene, hillTexture, hillTexture, hillTexture, hillTexture, hillTexture, hillTexture);
              
	}

    display() {

        this.k= this.levels;
        
        this.initialPosition = 0;

        for(var l = 0; l < this.levels; l++){      
        
            for(var i = 0; i < 2*this.k-2; i++){

                this.scene.pushMatrix();

                this.scene.translate(i + 1 + this.initialPosition, this.initialPosition, -this.initialPosition);
                
                this.cube.display();

                this.scene.popMatrix();
                
            }

            for(var i = 0; i < 2*this.k-2; i++){

                this.scene.pushMatrix();
                
                this.scene.translate(this.initialPosition + 2 * this.k - 2, this.initialPosition, -1 - i - this.initialPosition);
                
                this.cube.display();
                
                this.scene.popMatrix();
            }

            for(var i = 0; i < 2*this.k-2; i++){
                 
                this.scene.pushMatrix();
                
                this.scene.translate(-1 - i + 2 * this.k - 2 + this.initialPosition, this.initialPosition, -2 * this.k + 2 - this.initialPosition);
                
                this.cube.display();
                
                this.scene.popMatrix();
            }
            
            for(var i = 0; i < 2*this.k-2; i++){

                this.scene.pushMatrix();
                
                this.scene.translate(this.initialPosition, this.initialPosition, 1 + i - 2 * this.k + 2 - this.initialPosition);
                
                this.cube.display();
                
                this.scene.popMatrix();
            } 

           this.k -= 1;
           this.initialPosition += 1;        
            
        }

        this.scene.pushMatrix();
        
        this.scene.translate(this.levels - 1, this.levels - 1, -this.levels + 1);
        
        this.cube.display();
        
        this.scene.popMatrix();
        
    }
    
}

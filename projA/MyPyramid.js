/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks, height, sideLenght, sideTexture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.sideLenght = sideLenght;
        this.sideTexture = sideTexture;
        this.initBuffers(height,sideLenght);
    }

    initBuffers(height,sideLenght) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang + alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang + alphaAng);

            this.vertices.push(0,height,0);
            this.vertices.push(sideLenght* ca, 0,sideLenght* -sa);
            this.vertices.push( sideLenght* caa, 0,sideLenght* -saa);

            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(0.5 - 0.5 * Math.tan(alphaAng / 2), 1);
            this.texCoords.push(0.5 + 0.5 * Math.cos(alphaAng / 2), 1);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        console.log(this.texCoords);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}



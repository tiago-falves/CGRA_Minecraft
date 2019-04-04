/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, height, radius) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.height = height;
        this.radius = radius;
        this.initBuffers(height, radius);
    }
    initBuffers(height, radius) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

           
            this.vertices.push(radius*ca, 0, radius*-sa);//1
            this.vertices.push(radius*ca, height, radius*-sa);//2
            this.vertices.push(radius*caa, 0, radius*-saa);//4
            this.vertices.push(radius*caa, height, radius*-saa);//3

            // triangle normal computed by cross product of two edges
           var normal= [
                saa-sa,
                0,
                caa-ca
            ];

            this.normals.push(ca, 0, -sa);//1
            this.normals.push(ca, 2, -sa);//2
            this.normals.push(caa, 0, -saa);//4
            this.normals.push(caa, 2, -saa);//3

            // normalization
            var nsize=Math.sqrt(
                this.normals[0]*this.normals[0]+
                this.normals[1]*this.normals[1]+
                this.normals[2]*this.normals[2]+
                this.normals[3]*this.normals[3]
                );
            this.normals[0]/=nsize;
            this.normals[1]/=nsize;
            this.normals[2]/=nsize;
            this.normals[3]/=nsize;

            /*// push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);*/

            this.indices.push(4*i+2, (4*i+1) , (4*i+0) );
            this.indices.push(4*i+2, (4*i+3) , (4*i+1) );
            

            ang+=alphaAng;
        }

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
size = 144.5;
pegcount = 29;
pitch = size / (pegcount - 1);
cubesize = pitch * (pegcount);
$fn = 180;

module board() {
    translate([-pitch / 2, -pitch / 2, -3])
    cube([cubesize, cubesize, 3]);
}

module peg() {
    cylinder(3, 1, 1);
    translate([0, 0, 3]) cylinder(1, 1, 0);
}

module bead() {
    difference() {
        cylinder(5, 2.5, 2.5);
        cylinder(5, 1.5, 1.5);
    }
}

module test() {
    color([1, 1, 1], alpha=0.8) {
        board();
        
        for(x = [0 : pegcount]) {
            for (y = [0 : pegcount]) {
                translate([x * (size / pegcount), y * (size / pegcount), 0])
                    peg();
            }
        }
    }

    color([0, 0.3, 1])
        for(i = [0 : 5])
            for(j = [0: 5])
                translate([pitch * i, pitch * j, 0])
                    bead();
}

test();

// peg();
// bead();

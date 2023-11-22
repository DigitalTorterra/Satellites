const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);

let grid;

function preload() {
    // Preload assets if needed
}

function create() {
    // Create a graphics object to draw the grid
    const graphics = this.add.graphics();

    // Size and spacing for the dots in the grid
    const dotSize = 10;
    const gridSpacing = 20;

    // Draw the dotted grid infinitely
    for (let x = -config.width; x < config.width * 2; x += gridSpacing) {
        for (let y = -config.height; y < config.height * 2; y += gridSpacing) {
            graphics.fillStyle(0xffffff, 0.5);
            graphics.fillCircle(x, y, dotSize / 2);
        }
    }

    // Enable dragging functionality
    this.input.on('pointerdown', function (pointer) {
        grid = { x: pointer.x, y: pointer.y };
    });

    this.input.on('pointermove', function (pointer) {
        if (grid) {
            const deltaX = pointer.x - grid.x;
            const deltaY = pointer.y - grid.y;
            graphics.x += deltaX;
            graphics.y += deltaY;
            grid = { x: pointer.x, y: pointer.y };
        }
    });

    this.input.on('pointerup', function () {
        grid = null;
    });
}


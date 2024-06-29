import inquirer from 'inquirer';
// Define a class representing a Shape
class Shape {
    // Properties
    color;
    // Constructor
    constructor(color) {
        this.color = color;
    }
    // Method to describe the shape
    describe() {
        console.log(`This shape is ${this.color}.`);
    }
}
// Define a subclass of Shape representing a Circle
class Circle extends Shape {
    // Properties
    radius;
    // Constructor
    constructor(color, radius) {
        super(color);
        this.radius = radius;
    }
    // Method to calculate area
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}
// Define a subclass of Shape representing a Rectangle
class Rectangle extends Shape {
    // Properties
    width;
    height;
    // Constructor
    constructor(color, width, height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    // Method to calculate area
    calculateArea() {
        return this.width * this.height;
    }
}
// Function to prompt user for shape details
async function promptShapeDetails() {
    const shapeTypeAnswer = await inquirer.prompt({
        type: 'list',
        name: 'shapeType',
        message: 'Choose a shape:',
        choices: ['Circle', 'Rectangle']
    });
    let shapeDetails;
    if (shapeTypeAnswer.shapeType === 'Circle') {
        const { color, radius } = await inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter circle color:'
            },
            {
                type: 'number',
                name: 'radius',
                message: 'Enter circle radius:'
            }
        ]);
        shapeDetails = { shapeType: 'Circle', color, radius };
    }
    else {
        const { color, width, height } = await inquirer.prompt([
            {
                type: 'input',
                name: 'color',
                message: 'Enter rectangle color:'
            },
            {
                type: 'number',
                name: 'width',
                message: 'Enter rectangle width:'
            },
            {
                type: 'number',
                name: 'height',
                message: 'Enter rectangle height:'
            }
        ]);
        shapeDetails = { shapeType: 'Rectangle', color, width, height };
    }
    return shapeDetails;
}
// Main function
async function main() {
    const shapeDetails = await promptShapeDetails();
    let shape;
    if (shapeDetails.shapeType === 'Circle') {
        shape = new Circle(shapeDetails.color, shapeDetails.radius);
    }
    else {
        shape = new Rectangle(shapeDetails.color, shapeDetails.width, shapeDetails.height);
    }
    // Describe shape
    shape.describe();
    // Calculate and output area
    console.log(`Area: ${shape.calculateArea()}`);
}
// Run the main function
main();

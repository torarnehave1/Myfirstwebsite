// Import any required modules or libraries here
import fs from 'fs';
import path from 'path';



// Define your functions here
export function getHTML() {
  return fs.readFileSync(path.resolve('public/index.html'), 'utf8');
}

export function getCSS() {
    return fs
        .readFileSync(path.resolve('public/style.css'), 'utf8');
}

export function getJavaScript() {
    return fs
        .readFileSync(path.resolve('public/main.js'), 'utf8');
}

export function getImage() {
    return fs
        .readFileSync(path.resolve('public/image.jpg'));
}

export function get404() {
    return fs
        .readFileSync(path.resolve('public/404.html'), 'utf8');
}

export function get500() {
    return fs
        .readFileSync(path.resolve('public/500.html'), 'utf8');
}




//ReferenceError: __dirname is not defined in ES module scope, you can use the following workaround:







// Export your functions here



// Add any additional code or logic here
// Run the server using the following command:
// node --experimental-modules main.js

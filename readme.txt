commands for project initialization:

tsc --init
npm init
npm install --save express
npm install --save body-parser

used packeges:
npm install --save-dev @types/node //to let TypeScript know that require method exists,we can run this command

On npmjs.com, you will find many @types packages.These are packages which provide TypeScript translations
for JavaScript features. They contain code that allows TypeScript to understand a certain library,
a certain package or a certain commands

npm install --save-dev @types/express

comment out "moduleResolution": "node",  in the tsconfig.json
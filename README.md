##Problem Overview
I am trying to create a vscode extension with multiple [typescript project references](https://www.typescriptlang.org/docs/handbook/project-references.html) and am hitting the following error while running the extension:
```
Activating extension `Jarrett Spiker.jspiker-so-vscode-baseurl` failed: Cannot find module 'common/commonFile'
extensionHostProcess.js:457

Here is the error stack:  Error: Cannot find module 'common/commonFile'
	at Function.Module._resolveFilename (internal/modules/cjs/loader.js:602:15)
    ...
```
Everything builds fine, and VSCode does not find any problems in the source code.

Here is a sample project I created to replicate this problem 


###Reproducing the issue

 - Untar the attached tar
 - Run `npm install` from project root
 - Run `npm run compile` from project root
 - Open in VsCode, and run the "Extension" configuration
 - Run the "Show Sample StackOverflow Message" 

##Project Structure

Effectively, I wanted to set up my project as was described in [this question](https://stackoverflow.com/questions/52716934/project-references-in-typescript-3-with-separate-outdir), so I went with the recommendation of "setting up a master output directory for the entire composite project".

The project structure looks like this:
```
.
├── client
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   └── extension.ts
│   └── tsconfig.json
├── common
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   └── commonFile.ts
│   └── tsconfig.json
├── out
│   ├── client
│   │   ├── extension.d.ts
│   │   ├── extension.js
│   │   └── extension.js.map
│   └── common
│       ├── commonFile.d.ts
│       ├── commonFile.js
│       └── commonFile.js.map
├── package-lock.json
├── package.json
└── tsconfig.json
```

I wanted to avoid confusing relative paths, so I tried to use a baseUrl to point to the root of `out`, and `paths` lookups to find node_modules in the appropriate places. For easy reference, here is the `tsconfig.json` for the `client` subproject:
```
{
	"compilerOptions": {
		"module": "commonjs",
		"target": "es6",
		"lib": ["es6"],
		"composite": true,
		"sourceMap": true,
		"rootDir": "src",
		"tsBuildInfoFile" : "./client.tsbuildinfo",
		"strict": true,
		"noImplicitReturns": true,
		"outDir": "../out/client/",
		"baseUrl": "../out/",
		"paths": {
			"*" : [
				"*",
				"../client/node_modules/*"
			]
		}
	},
	"include": [
		"src"
	],
	"exclude": [
		"node_modules",
		".vscode-test"
	],
	"references": [
		{ "path": "../common" }
	]
}
```

##Questions

 - Am I going to be able to make this project structure work, or should I just bite the bullet and just have a bunch of `../../out/common/commonFile` type paths in my imports, which will break if I ever move files around
 - If this is not how `baseUrl` is supposed to work, can someone point me to a good example? From where Im sitting, it seems like `baseUrl` is always going to create .js files with invalid imports...which seems like it cant be right
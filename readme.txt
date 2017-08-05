readme.txt
There are 7 files that constitute a skeleton project.
package.json
    - Has info about the project, its git repository
    - all the project's external dependencies angular version and libraries
    - tsc is the command run by npm start command to start the typescript compiler, 
        - concurrently means it runs alongwith another command
        - tsc -w (means any change in the source files are watched by the server 
        and recompiled immediately, so the change is immediately visible on the browser)
        - lite-server hosts the application on a URL (like an Microsoft IIS or Apache)
    - devdependencies
        the libraries needed to run the project in the dev enviornment.
        Then how does the project run in production, is there another setting for it?

tsconfig.json 
    - holds configuration for the typescript compiler.
    - we write the code in typescript not in javasript.
    - the compiler transpiles the code from typescript to javascript.
    - Javascript change and approval process takes longer to realize in the real world. 
    - Hence typescript allows us to compile same code to the es5 or es6 version 
    as supported by Javascript you are planning to deploy to.

systemjs.config.js
    - it is a javascript file
    - it is a JS module loader. Other module loader is "webpack for angular2".
    - this file is used to specify the configuration for the module loader 
    which allows to import these javascript modules 
    from the "dependencies" in the package.json into the typescript files.
    - path specifies which directory the modules will be available in.
    - map tells the module loader where certain things are such as app and dependencies.
    - rxjs specifies the http interactions.
    - packages specifies default values for all items specified in the "map", 
        such as the main executable for each item.
        and defaultExtension for files missing an extension should be considered 
        as files of type etc.

After you have these 3 files package.json, tsconfig.json and systemjs.config.js you can issue the 
npm install command using the terminal on vss under skeleton the parent directory.
This begins to download a bunch of files as defined in your files.
Then it gives some errors like so -
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):

npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.1.2: wanted {"os":"darwin","
arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN angular-in-memory-web-api@0.1.13 requires a peer of rxjs@5.0.0-beta.12 but none was installed.
npm WARN @angular/http@2.1.2 requires a peer of rxjs@5.0.0-beta.12 but none was installed.
npm WARN @angular/router@3.1.2 requires a peer of rxjs@5.0.0-beta.12 but none was installed.
npm WARN @angular/core@2.1.2 requires a peer of rxjs@5.0.0-beta.12 but none was installed.


PS: VSS listed that txconfig.json had a problem like so -
file: 'file:///c%3A/home/courses/angular2%20and%20typescript/skeleton/tsconfig.json'
severity: 'Error'
message: 'No inputs were found in config file 'c:/home/courses/angular2 and typescript/skeleton/tsconfig.json'. Specified 'include' paths were '["**/*"]' and 'exclude' paths were '["node_modules","bower_components","jspm_packages"]'.'
at: '1,1'
source: 'ts'






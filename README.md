# wpZip

## Creates a wordpress distribution archive file

One of the best things about wordpress development is tools like wp-cli.  However this is designed around the premise that you will be developing your theme or plugin within the wordpress directory structure.  I don't always want to do this.  Sometimes I want to build my plugin elsewhere and push the distribution files to the theme or plugins folder.  Whilst wp-cli has a plugin called dist-archive that builds a distribution archive excluding files that are in the .distignore it only works within the wp structure.

In the past i've done this using bash files but I want to use modern tools like gulp to make the process easier.

So I have lovingly crafted this Node package to facilitate that.

To install run 

    npm i wpzip --save-dev

include it in a gulp task as follows

    async function generateZip( )
    {
        var ProjectPath = "./";   // Path of the folder you wish to create a release for
        var version = '1.0.0';  // This should match your theme or plugin version number 

        var zipName = "./project-"+version+".zip";  // The name of the zip file 

        var targetPath = "theme"+version;       // Name of the root path the files are stored in the zip file 
                                                // This will be the name within the wp themes folder

        var compression = 7;    // default level is 9 so you only need to pass it if you need a lower level 

        zip.wpZip ( zipName, ProjectPath, targetPath, compression );

    }

    gulp.task( 'release', generateZip );


I combine this package with my themeVersion package as follows

    const tv = require( 'themeversion' );

    .
    .
    .

    async function generateZip( )
    {
        var ProjectPath = "./";

        try {
            // Get the version number from the style.css file
            const version = await tv.getVersion( path.join( ProjectPath, 'style.css') );

            var zipName = "./project-"+version+".zip";  // name of the zip file

            var targetPath = "theme"+version;       // Name of the root path the files are stored in the zip file 
                                                    // This will be the name within the wp themes folder

            zip.wpZip ( zipName, ProjectPath, targetPath );
        }
        catch( e )
        {
            console.log( e );
        }
    }

You can find themeVersion here [https://www.npmjs.com/package/themeversion](https://www.npmjs.com/package/themeversion)

#### I would consider this an early Beta version so use at your own risk.

### Thanks

This makes use of the following node packages

*Glob* which can you can find out more details about here (https://www.npmjs.com/package/glob)[https://www.npmjs.com/package/glob]

and

*Archive* which can you can find out more about here (https://www.npmjs.com/package/archiver)[https://www.npmjs.com/package/archiver]

const gl = require( "glob" );
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

function createArchive( archiveName = "release.zip", basePath = "./", targetPath = "theme", compression = 9 )
{

    fs.readFile( path.join( basePath, ".distignore"), "UTF8", ( err, content ) => {
        if ( err ) 
        {
            ignoreFiles = [];            

            const files = gl.globSync( path.join( basePath, "**/*" ), { ignore: ignoreFiles } );

            if ( files.length > 0 )
            {
                const output = fs.createWriteStream( archiveName );
    
                const archive = archiver('zip', {
                    zlib: { level: compression } // Sets the compression level.
                });   
    
                // pipe archive data to the file
                archive.pipe(output);
    
                files.forEach( f => {
                    let name = path.join( targetPath, f.replace( path.join( basePath, "" ), "" ));
    
                    archive.file( f , { name: name });
                })
    
                archive.finalize();

            }
        }
        else
        {
            ignoreBaseFiles = content.split("\n");

            // console.log( ignoreBaseFiles );

            ignoreFiles = ignoreBaseFiles.map( f => {
                
                // console.log( f.length );

                if ( f[0] != '#' && f.length > 0 )
                {
                    if ( f[ f.length-1] == '*' )
                        return path.join( basePath, f );
                    else
                    {
                        try {
                            stat = fs.statSync( path.join( basePath, f ) );

                            if ( stat && stat.isFile() )
                            {
                                return path.join( basePath, f );
                            }
                            else if ( stat && stat.isDirectory() )
                            {
                                return path.join( path.join( basePath, f ), "**" );
                            }
                        }
                        catch( e )
                        {
                            // ignore any file that gives a stat error
                            return path.join( basePath, f );
                        }
                    }

                }
            }).filter( f => { return ( f !== undefined ? true : false ); });

            const files = gl.globSync( path.join( basePath, "**/*" ), { ignore: ignoreFiles } );

            console.log( files );

            if ( files.length > 0 )
            {
                const output = fs.createWriteStream( archiveName );
    
                const archive = archiver('zip', {
                    zlib: { level: compression } // Sets the compression level.
                });   
    
                // pipe archive data to the file
                archive.pipe(output);
    
                files.forEach( f => {
                    let name = path.join( targetPath, f.replace( path.join( basePath, "" ), "" ));

                    console.log( name );

                    archive.file( f , { name: name });
                })
    
                archive.finalize();

            }
        }

    });

}

exports.wpZip = createArchive;

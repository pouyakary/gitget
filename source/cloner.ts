
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { exec } from
        "https://deno.land/x/exec/mod.ts";
    import { GGProject, GGTree, GGTreeGroup } from
        "./ggtypes.ts"
    import { GGConfigs } from
        "./configs.ts"

//
// ─── CLONE TREE ─────────────────────────────────────────────────────────────────
//

    export async function cloneProjects ( projects: GGProject[ ], configs: GGConfigs ) {
        const allProjectsCount =
            projects.length.toString( )
        let no = 1
        for ( const project of projects ) {
            await cloneProject( project, no++, allProjectsCount, configs )
        }
    }

//
// ─── CLONE PROJECT ──────────────────────────────────────────────────────────────
//

    async function cloneProject ( project: GGProject,
                                       no: number,
                                      all: string,
                                  configs: GGConfigs ) {
        const printNumber =
            "0".repeat( all.length - no.toString( ).length ) + no.toString( )
        const printText =
            `> [${ printNumber }/${ all }] cloning: ${ project.url }`
        console.log( printText )

        const destinationFolder =
            `${ configs.backupDirectory }/${ project.folderNames.join( "/" ) }`
        const url =
            project.url.replace( "http://", `http://${ configs.gitlabUserID }:${ configs.privateAccessToken }@` ) + ".git"
        const execResponse =
            await exec( `git clone ${ url } "${ destinationFolder }"` )

        if ( !execResponse.output.match( /^\s*$/ ) ) {
            console.log( "  >>>", execResponse.output )
        }
    }

// ────────────────────────────────────────────────────────────────────────────────


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
        for ( const project of projects ) {
            await cloneProject( project, configs )
        }
    }

//
// ─── CLONE PROJECT ──────────────────────────────────────────────────────────────
//

    async function cloneProject ( project: GGProject, configs: GGConfigs ) {
        console.log( "> cloning:", project.url )
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

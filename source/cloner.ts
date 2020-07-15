
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

    export async function cloneTree ( tree: GGTree, configs: GGConfigs ) {
        for ( const group of tree ) {
            await cloneTreeGroup( group, configs )
        }
    }

//
// ─── CLONE TREE GROUP ───────────────────────────────────────────────────────────
//

    async function cloneTreeGroup ( group: GGTreeGroup, configs: GGConfigs ) {
        for ( const project of group.projects ) {
            await cloneProject( project, configs )
        }

        for ( const sub of group.subs ) {
            await cloneTreeGroup( sub, configs )
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

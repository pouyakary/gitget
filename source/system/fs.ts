
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { ensureDir } from
        "https://deno.land/std/fs/mod.ts"
    import { exec } from
        "https://deno.land/x/exec/mod.ts";
    import { GGTree, GGProject } from
        "../ggtypes.ts"

//
// ─── MAKE DIRECTORY ─────────────────────────────────────────────────────────────
//

    export async function makeDireoctryForTree ( tree: GGTree, root: string ) {
        await ensureDir( `${ root }` )
        for ( const group of tree ) {
            console.log( `${ root }/${ group.self.path }` )
            await ensureDir( `${ root }/${ group.self.path }` )
        }
    }

//
// ─── CLONE PROJECT ──────────────────────────────────────────────────────────────
//

    export async function cloneProject ( project: GGProject, root: string ) {
        console.log( "> cloning:", project.url )
        exec( `git clone ${ project.url } ${ root }/${ project.folder.join("/") }/${ project.name }` )
    }



// ────────────────────────────────────────────────────────────────────────────────

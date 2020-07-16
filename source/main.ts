#!/usr/bin/env -S deno run --allow-run --allow-net --quiet

//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { GitLabClient } from
        "./gitlab/api.ts"
    import { get_configs } from
        "./configs.ts"
    import { cloneProjects } from
        "./cloner.ts"

//
// ─── CONST CLIENT ───────────────────────────────────────────────────────────────
//

    const configs =
        get_configs( )
    const client =
        new GitLabClient( configs.gitlabIP, configs.privateAccessToken )

//
// ─── MAIN ───────────────────────────────────────────────────────────────────────
//

    console.log( )
    console.log( "Downloading GitLab Info. (Takes a few minutes...)\n")
    const projects =
        await client.getProjects( )

    console.log( "Cloning (Takes much more!)\n")
    await cloneProjects( projects, configs )

    console.log()
    console.log("Done!\n")

// ────────────────────────────────────────────────────────────────────────────────


//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { GitLabClient } from
        "../api.ts"
    import { GGGroup, GGTree, GGTreeGroup } from
        "../../ggtypes.ts"

//
// ─── API ────────────────────────────────────────────────────────────────────────
//

    export async function makeGGTree ( client: GitLabClient, log: boolean ) {
        const tree: GGTree =
            [ ]

        if ( log ) {
            console.log( "Generating Git Lab Tree")
        }

        const topLevelGroups =
            await client.getGroups( )

        for ( const group of topLevelGroups ) {
            const groupTree =
                await makeGroupNode ( client, group, 0, log )
            tree.push( groupTree )
        }

        return tree
    }

//
// ─── MAKE GROUP NODE ────────────────────────────────────────────────────────────
//

    async function makeGroupNode ( client: GitLabClient,
                              gitLabGroup: GGGroup,
                               stackLevel: number,
                                      log: boolean ): Promise<GGTreeGroup> {
        // info
        if ( log ) {
            console.log ( "   ".repeat( stackLevel ) + ">", gitLabGroup.name )
        }

        //
        const result: GGTreeGroup = {
            self:       gitLabGroup,
            projects:   [ ],
            subs:       [ ],
        }

        // projects
        result.projects =
            await client.getProjectsOfGroup( gitLabGroup.id )

        // sub groups
        const subGroupGGs =
            await client.getSubgroupsOf( gitLabGroup.id )
        for ( const subGroup of subGroupGGs ) {
            const subGroupTree =
                await makeGroupNode( client, subGroup, stackLevel + 1, log )
            result.subs.push( subGroupTree )
        }

        //
        return result
    }

// ────────────────────────────────────────────────────────────────────────────────

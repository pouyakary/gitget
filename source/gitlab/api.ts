
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { GitLabProject, GitLabGroup } from
        "./gitlab-types.ts"
    import { GGGroup, GGProject } from
        "../ggtypes.ts"
    import { makeGGTree } from
        "./extended-gitlab/tree.ts"

//
// ─── GITLAB API ─────────────────────────────────────────────────────────────────
//

    export class GitLabClient {

        //
        // ─── STORAGE ─────────────────────────────────────────────────────
        //

            private readonly GitLabIP:
                string
            private readonly PrivateAccessToken:
                string

        //
        // ─── CONSTRUCTOR ─────────────────────────────────────────────────
        //

            constructor ( ip: string, token: string ) {
                this.GitLabIP = ip
                this.PrivateAccessToken = token
            }

        //
        // ─── CALL GITLAB ─────────────────────────────────────────────────
        //

            private async requestGitLab ( command: string, ...options: string[ ] ) {
                const allOptions =
                    ( options.length > 0
                        ? "?" + options.map( x => encodeURIComponent( x ) ).join( "&" )
                        : ""
                        )
                const url =
                    `http://${ this.GitLabIP }/api/v4/${ command }${ allOptions }`
                // console.log( "> calling:", url )
                const call =
                    await fetch( url, {
                        headers: {
                            "Private-Token": this.PrivateAccessToken
                        }
                    })
                return call.json( )
            }

        //
        // ─── MAKE GG TREE ────────────────────────────────────────────────
        //

            public async makeTree ( log = false ) {
                return await makeGGTree( this, log )
            }

        //
        // ─── PROJECTS ────────────────────────────────────────────────────
        //

            public async getProjects ( ): Promise<GGProject[ ]> {
                const projects: GitLabProject[ ] =
                    await this.requestGitLab( "projects" )
                return projects.map( constructGGProject )
            }

        //
        // ─── GROUPS ──────────────────────────────────────────────────────
        //

            public async getGroups ( ): Promise<GGGroup[ ]> {
                const groups: GitLabGroup[ ] =
                    await this.requestGitLab( "groups", "all_available=true" )
                const ggg =
                    groups.map( constructGGGroup )
                return ggg
            }

        //
        // ─── SUBGROUPS ───────────────────────────────────────────────────
        //

            public async getSubgroupsOf ( group_id: number ): Promise<GGGroup[ ]> {
                const subgroups: GitLabGroup[ ] =
                    await this.requestGitLab( `/groups/${ group_id }/subgroups` )
                const ggg =
                    subgroups.map( constructGGGroup )
                return ggg
            }

        //
        // ─── GROUP PROJECTS ──────────────────────────────────────────────
        //

            public async getProjectsOfGroup ( group_id: number ): Promise<GGProject[ ]> {
                const projects: GitLabProject[ ] =
                    await this.requestGitLab( `/groups/${ group_id }/projects` )
                return projects.map( constructGGProject )
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    function constructGGProject ( project: GitLabProject ): GGProject {
        const folder =
            project.namespace ? project.namespace.full_path.split( "/" ) : [ ]
        return {
            id:         project.id,
            name:       project.name,
            path:       project.path,
            url:        project.web_url,
            folder:     folder
        }
    }

    function constructGGGroup ( group: GitLabGroup ): GGGroup {
        const folder =
            group.full_path.split( "/" )
        return {
            id:         group.id,
            name:       group.name,
            path:       group.path,
            url:        group.web_url,
            folder:     folder
        }
    }

// ────────────────────────────────────────────────────────────────────────────────

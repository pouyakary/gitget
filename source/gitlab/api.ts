
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { GitLabProject, GitLabGroup } from
        "./gitlab-types.ts"
    import { GGGroup, GGProject } from
        "../ggtypes.ts"

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

            private async requestGitLab<T> ( command: string ): Promise<T> {

                const url =
                    `http://${ this.GitLabIP }/api/v4/${ command }`

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
        // ─── GET ALL ─────────────────────────────────────────────────────
        //

            private async getAll<T> ( query: string ): Promise<T[ ]> {
                let results =
                    new Array<T> ( )
                for ( let page = 1; true; page++ ) {
                    const command =
                        `${ query }?per_page=30&page=${ page }`
                    const pageResults =
                        await this.requestGitLab<T[ ]>( command )
                    if ( pageResults.length == 0 ) {
                        return results
                    } else {
                        results = results.concat( pageResults )
                    }
                }
            }

        //
        // ─── GROUPS ──────────────────────────────────────────────────────
        //

            public async getGroups ( ): Promise<GGGroup[ ]> {
                return ( await this.getAll<GitLabGroup>( "groups?all_available=true" ) )
                        .map( constructGGGroup )
            }

        //
        // ─── GET PROJECT ─────────────────────────────────────────────────
        //

            public async getProjects ( ): Promise<GGProject[ ]> {
                return ( await this.getAll<GitLabProject>( "projects" ) )
                        .map( constructGGProject )
            }

        // ─────────────────────────────────────────────────────────────────

    }

//
// ─── TOOLS ──────────────────────────────────────────────────────────────────────
//

    function constructGGProject ( project: GitLabProject ): GGProject {
        const folder =
            project.namespace ? project.namespace.full_path.split( "/" ) : [ ]
        const folderNames =
            project.name_with_namespace
                .split( "/" )
                .map( x => x.trim( ) )
        return {
            id:             project.id,
            name:           project.name,
            path:           project.path,
            url:            project.web_url,
            sshURL:         project.ssh_url_to_repo,
            folderNames:    folderNames,
            folder:         folder,
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

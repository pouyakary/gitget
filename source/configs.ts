
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    import { config } from
        "https://deno.land/x/dotenv/mod.ts"

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

    interface GGEnvConfigs {
        ACCESS_TOKEN?:      string
        GITLAB_IP?:         string
        BACKUP_DIRECTORY?:  string
    }

    export interface GGConfigs {
        privateAccessToken:     string
        gitlabIP:               string
        backupDirectory:        string
    }

//
// ─── GET CONFIGS ────────────────────────────────────────────────────────────────
//

    export function get_configs ( ): GGConfigs {
        const configs: GGEnvConfigs =
            config( )
        const result: GGConfigs = {
            privateAccessToken: "",
            gitlabIP:           "",
            backupDirectory:    "",
        }

        if ( configs.ACCESS_TOKEN ) {
            result.privateAccessToken = configs.ACCESS_TOKEN
        } else {
            throw "Could not find GitLab's Access Token in the ENV file (Key: ACCESS_TOKEN)"
        }

        if ( configs.GITLAB_IP ) {
            result.gitlabIP = configs.GITLAB_IP
        } else {
            throw "Could not find GitLab's IP in the ENV file (Key: GITLAB_IP)"
        }

        if ( configs.BACKUP_DIRECTORY ) {
            result.backupDirectory = configs.BACKUP_DIRECTORY
        } else {
            throw "Could not find the direoctory to replicate the git tree (Key: BACKUP_DIRECTORY)"
        }

        return result
    }

// ────────────────────────────────────────────────────────────────────────────────


//
// ─── NAMESPACE ──────────────────────────────────────────────────────────────────
//

    export interface GitLabNamespace {
        id:             number
        name:           string
        path:           string
        kind:           "group"
        full_path:      string
        parent_id:      string | null
        avatar_url:     string | null
        web_url:        string
    }

//
// ─── LINKS ──────────────────────────────────────────────────────────────────────
//

    export interface GitLabLinks {
        self:               string
        issues:             string
        merge_requests:     string
        repo_branches:      string
        labels:             string
        events:             string
        members:            string
    }

//
// ─── VISIBILITY ─────────────────────────────────────────────────────────────────
//

    export type GitLabVisibility =
        "public" | "internal" | "private"

//
// ─── USER STATUS ────────────────────────────────────────────────────────────────
//

    export type GitLabUserAccess =
        "owner" | "developer" | "maintainer" | "guest"

//
// ─── ENTITY ─────────────────────────────────────────────────────────────────────
//

    export interface GitLabEntity {
        id:             number
        description:    string
        name:           string
        path:           string
        created_at:     string
        web_url:        string
        avatar_url:     null | string
        visibility:     GitLabVisibility
    }

//
// ─── PROJECTS ───────────────────────────────────────────────────────────────────
//

    export interface GitLabProject extends GitLabEntity {
        name_with_namespace:                                string
        path_with_namespace:                                string
        default_branch:                                     string
        tag_list:                                           string[ ]
        ssh_url_to_repo:                                    string
        http_url_to_repo:                                   string
        readme_url:                                         string | null
        star_count:                                         number
        forks_count:                                        number
        last_activity_at:                                   string
        namespace:                                          GitLabNamespace | null
        _links:                                             GitLabLinks
        empty_repo:                                         boolean
        archived:                                           boolean
        resolve_outdated_diff_discussions:                  boolean
        container_registry_enabled:                         boolean
        issues_enabled:                                     boolean
        merge_requests_enabled:                             boolean
        wiki_enabled:                                       boolean
        jobs_enabled:                                       boolean
        snippets_enabled:                                   boolean
        issues_access_level:                                string
        repository_access_level:                            string
        merge_requests_access_level:                        string
        wiki_access_level:                                  string
        builds_access_level:                                string
        snippets_access_level:                              string
        shared_runners_enabled:                             boolean
        lfs_enabled:                                        boolean
        creator_id:                                         number
        import_status:                                      string
        open_issues_count:                                  number
        ci_default_git_depth:                               number
        public_jobs:                                        boolean
        build_timeout:                                      number
        auto_cancel_pending_pipelines:                      string
        build_coverage_regex:                               boolean
        ci_config_path:                                     boolean
        shared_with_groups:                                 string[ ]
        only_allow_merge_if_pipeline_succeeds:              boolean
        request_access_enabled:                             boolean
        only_allow_merge_if_all_discussions_are_resolved:   boolean
        printing_merge_request_link_enabled:                boolean
        merge_method:                                       string
        auto_devops_enabled:                                false
        auto_devops_deploy_strategy:                        string
    }

//
// ─── GROUP ──────────────────────────────────────────────────────────────────────
//

    export interface GitLabGroup extends GitLabEntity {
        share_with_group_lock:              boolean
        require_two_factor_authentication:  boolean
        two_factor_grace_period:            number
        project_creation_level:             GitLabUserAccess
        auto_devops_enabled:                null | boolean
        subgroup_creation_level:            GitLabUserAccess
        emails_disabled:                    null | boolean
        mentions_disabled:                  null | boolean
        lfs_enabled:                        boolean
        default_branch_protection:          number
        request_access_enabled:             boolean
        full_name:                          string
        full_path:                          string
        file_template_project_id:           number
        parent_id:                          number
    }

// ────────────────────────────────────────────────────────────────────────────────

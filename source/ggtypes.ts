
//
// ─── ENTITY ─────────────────────────────────────────────────────────────────────
//

    interface GGEntity {
        id:         number
        name:       string
        path:       string
        url:        string
        folder:     string[ ]
    }

//
// ─── PROJECT ────────────────────────────────────────────────────────────────────
//

    export interface GGProject extends GGEntity {
    }

//
// ─── GROUP ──────────────────────────────────────────────────────────────────────
//

    export interface GGGroup extends GGEntity {

    }

//
// ─── TREE ───────────────────────────────────────────────────────────────────────
//

    export type GGTree =
        GGTreeGroup[ ]

    export interface GGTreeGroup {
        self:       GGGroup,
        projects:   GGProject[ ]
        subs:       GGTreeGroup[ ]
    }

// ────────────────────────────────────────────────────────────────────────────────

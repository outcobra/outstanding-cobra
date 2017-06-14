export interface Info {
    git: {
        commit: {
            time: Date,
            id: string
        },
        branch: string
    },
    build: {
        version: string,
        artifact: string,
        name: string,
        group: string,
        time: Date
    }
}

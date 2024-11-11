export interface University {
    id: number
    name: string
    code: string
}

export type Uni = University

export interface User {
    id: number
    name: string
    email: string
    university?: University
    subjects?: string[]
}
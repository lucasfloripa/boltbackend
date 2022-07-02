export interface EditUserProject {
  edit: (editParams: EditUserProject.Params) => Promise<boolean>
}

export namespace EditUserProject {
  export type Params = {
    title: string
  }
}

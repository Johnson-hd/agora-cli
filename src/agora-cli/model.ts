export interface createProjectAnswers {
  description: string
  author: string
  name?: string
}

export interface createFrontendProjectAnswers extends createProjectAnswers {
  template: string
}

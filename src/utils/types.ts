export interface AppModel {
    getAllInDate(date: string, csvRows: string[][]): Promise<string[][]>
}

export interface AppController {
  model: AppModel
}
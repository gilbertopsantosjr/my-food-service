/* use abstract class as javascript doesnt have interfaces for DI*/
export abstract class CategoryDeleteRepository {
  abstract execute(categoryId: number): Promise<boolean>
}

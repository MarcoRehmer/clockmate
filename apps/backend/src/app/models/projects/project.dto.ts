export interface ProjectDto {
  id: number;
  name: string;
  description?: string;
  active: boolean;
  customerId?: number;
}

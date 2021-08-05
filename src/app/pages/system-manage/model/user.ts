export class User {
  id?: string;
  userName?: string;
  phoneNumber?: string;
  sex?: number;
  avatar?: string;
  name?: string;
  roleIds?: string[];
  isActive?: boolean;
  password?: string;
  createdTime?: Date;
  roleName?: string;
  positionName?: string;
  departmentName?: string;
  [propName: string]: any;

}

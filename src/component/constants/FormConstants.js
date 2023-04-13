import {
  ADMIN_COMPLAINTS,
  USERS,
  DEPARTMENTS,
  LOCATIONS,
  COMPLAINTS,
  PATH_PROFILE,
} from "./RouteConstants";

export const loginFormConstantants = [
  {
    key: "email",
    label: "email",
    type: "text",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
  },
];

export const registerFormConstantants = [
  {
    key: "name",
    label: "Name",
    type: "text",
  },
  {
    key: "email",
    label: "Email",
    type: "text",
  },
  {
    key: "departmentId",
    label: "Department",
    type: "select",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
  },
  {
    key: "retype_password",
    label: "Retype password",
    type: "password",
  },
];

export const navigationConstants = [
  {
    label: "Complaint List",
    path: COMPLAINTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_USER"],
  },
  {
    label: "Admin Department List",
    path: DEPARTMENTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Admin Location List",
    path: LOCATIONS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Admin User List",
    path: USERS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Admin Complaint List",
    path: ADMIN_COMPLAINTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    key: "profile",
    label: "Profile",
    path: PATH_PROFILE,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    key: "log_out",
    label: "",
    path: "",
    iconName: "fa-power-off",
    rolesList: ["ROLE_ADMIN", "ROLE_USER"],
  },
];

// export const userNavigation = [];

export const addComplaintFormConstants = [
  {
    key: "title",
    label: "Title",
    type: "text",
    roleList: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    key: "description",
    label: "Description",
    type: "text",
    roleList: ["ROLE_ADMIN", "ROLE_USER"],
  },
  {
    key: "departmentId",
    label: "Department",
    type: "select",
    roleList: ["ROLE_ADMIN"],
  },
  {
    key: "locationId",
    label: "Location",
    type: "select",
    roleList: ["ROLE_ADMIN"],
  },
  {
    key: "userId",
    label: "User List",
    type: "select",
    roleList: ["ROLE_ADMIN"],
  },
];

export const addUserFormConstants = [
  {
    key: "name",
    label: "Name",
    type: "text",
    formName: ["add_user", "edit_user"],
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    formName: ["add_user", "edit_user"],
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    formName: ["add_user"],
  },
  {
    key: "departmentId",
    label: "Department",
    type: "select",
    formName: ["add_user", "edit_user"],
  },
  {
    key: "locationId",
    label: "Location",
    type: "select",
    formName: ["add_user", "edit_user"],
  },
];

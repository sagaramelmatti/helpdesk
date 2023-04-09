import {
  CUSTOMERS,
  ADMIN_COMPLAINTS,
  USERS,
  DEPARTMENTS,
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
    label: "Setting",
    path: "",
    iconName: "fa-wrench",
    rolesList: ["ROLE_ADMIN"],
    subMenu: [
      {
        label: "Customer List",
        path: CUSTOMERS,
        iconName: "fa-address-book",
      },
    ],
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

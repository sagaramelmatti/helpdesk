import {
  ADMIN_COMPLAINTS,
  USERS,
  DEPARTMENTS,
  LOCATIONS,
  USERCOMPLAINTS,
  PASSWORDCHANGE,
  REPORTS,
  PATH_PROFILE,
  SUPERVISOR_COMPLAINTS,
} from "./RouteConstants";

export const loginFormConstantants = [
  {
    key: "email",
    label: "Email/Login Id",
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
    path: USERCOMPLAINTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_USER"],
  },
  {
    label: "Change Password",
    path: PASSWORDCHANGE,
    iconName: "fa-address-book",
    rolesList: ["ROLE_USER"],
  },
  {
    label: "Department List",
    path: DEPARTMENTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Location List",
    path: LOCATIONS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Complaints Report",
    path: REPORTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "User",
    path: USERS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    label: "Complaint List",
    path: ADMIN_COMPLAINTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_ADMIN"],
  },
  {
    key: "profile",
    label: "Profile",
    path: PATH_PROFILE,
    iconName: "fa-address-book",
    rolesList: [ "ROLE_USER", "ROLE_SUPERVISOR"],
  },
  {
    // key: "Complaint List",
    label: "Complaint List",
    path: SUPERVISOR_COMPLAINTS,
    iconName: "fa-address-book",
    rolesList: ["ROLE_SUPERVISOR"],
  },
  {
    key: "log_out",
    label: "Logout",
    path: "",
    iconName: "fa-power-off",
    rolesList: ["ROLE_ADMIN", "ROLE_USER", "ROLE_SUPERVISOR"],
  },
];

// export const userNavigation = [];

export const addComplaintFormConstants = [
  {
    key: "title",
    label: "Subject",
    type: "text",
    roleList: ["ROLE_ADMIN", "ROLE_USER"],
    isRequired: true,
  },
  {
    key: "description",
    label: "Description",
    type: "text",
    roleList: ["ROLE_ADMIN", "ROLE_USER"],
    isRequired: false,
  },
  {
    key: "locationId",
    label: "Location",
    type: "select",
    roleList: ["ROLE_ADMIN", "ROLE_USER"],
    isRequired: true,
  },
  {
    key: "departmentId",
    label: "Department",
    type: "hidden",
    roleList: ["ROLE_ADMIN"],
    isRequired: true,
  },
  {
    key: "userId",
    label: "User",
    type: "select",
    roleList: ["ROLE_ADMIN"],
    isRequired: true,
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
    key: "locationId",
    label: "Location",
    type: "select",
    formName: ["add_user", "edit_user"],
  },
  {
    key: "departmentId",
    label: "Department",
    type: "select",
    formName: ["add_user", "edit_user"],
  },
];

export const filterFormFields = [
  {
    key: "locationId",
    label: "Location",
    type: "select",
    listName: "departmentList",
    pageName: ["admin_complaints_list", "user_list"],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    listName: "statusList",
    pageName: ["admin_complaints_list", "user_list"],
  },
];

export const userStatusList = [
  {
    label: "Active",
    value: "A",
  },
  {
    label: "Deactive",
    value: "D",
  },
];

export const complaintStatusList = [
  {
    label: "New Complaint",
    value: "New Complaint",
  },
  {
    label: "Resolved",
    value: "Resolved",
  },
  {
    label: "Reject",
    value: "Reject",
  },
];

export const adminReportsSelectConstants = [
  {
    key: "location",
    label: "Location",
    type: "select",
  },
  {
    key: "from_date",
    label: "From date",
    type: "calender",
  },
  {
    key: "to_date",
    label: "To date",
    type: "calender",
  },
];

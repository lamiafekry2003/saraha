let canAccessPage = false;

export const allowAccess = () => {
  canAccessPage = true;
};

export const disAllowAccess = () => {
  canAccessPage = false;
};

export const checkAccess = () => {
  return canAccessPage;
};

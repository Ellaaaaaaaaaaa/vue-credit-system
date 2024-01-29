import request from "@/utils/request";

export const doLogin = (user) => {
  return request.post("/user/login", {
    //这里是后端需要account字符，也就是用户名
    account: user.username,
    password: user.pass,
  });
};
export const logout = () => {
  return request.post("/user/logout");
};

const load = async ({ cookies }) => {
  const session = cookies.get("admin_session");
  const secret = process.env.SESSION_SECRET || "default-secret";
  const isAuth = session === secret;
  return { isAuth };
};
export {
  load
};

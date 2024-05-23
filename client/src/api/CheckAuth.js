export default function CheckAuth(response) {
  const data = response.data;
  const status = response.status;
  return status !== 401 && data.error !== "Invalid email or password";
}

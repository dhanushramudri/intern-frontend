export default function Logout() {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  localStorage.clear();
}

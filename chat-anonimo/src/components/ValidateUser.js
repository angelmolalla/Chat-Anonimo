export default function () {
  var storedId = sessionStorage.getItem("id");
  if (!storedId) return true;
  else return false;
}

export function getDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("en-us", { month: "long" });
  const day = currentDate.getDate();
  return year + " " + day + " " + month;
}

export function getTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

console.log(getDate());
console.log(getTime());

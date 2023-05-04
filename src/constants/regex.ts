export const Regex = {
  PHONE_NUMBER: /^[0-9]{9,10}$/g,
  ZIP_CODE: /^[0-9]{5}$/g,
  url: new RegExp(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  ),
}

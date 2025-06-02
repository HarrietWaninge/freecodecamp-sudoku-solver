function createRandomString(length, valid) {
  let chars;
  let result = "";

  if (valid) {
    chars = ".123456789";
  } else {
    chars = ",#+)(}{][|abcd'";
  }
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

module.exports = {
  createRandomString,
};

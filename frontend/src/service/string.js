const getRandomString = (length) => {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

const getFileExtension = (filename) => {
  var re = /(?:\.([^.]+))?$/
  var ext = re.exec(filename)[1]
  return ext
}

const isEmail = (email) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
}

const getAuth = (string) => {
  let res = null
  if (string !== '') {
    res = JSON.parse(string)
  }
  return res
}

const isNumeric = (str) => {
  return !isNaN(str)
}

const formatYmd = (date) => {
  return date.toISOString().slice(0, 10)
}

const getMonth = (month) => {
  const mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  return mlist[month-1]
}

export {
  getRandomString,
  getFileExtension,
  isEmail,
  isNumeric,
  getAuth,
  formatYmd,
  getMonth,
}
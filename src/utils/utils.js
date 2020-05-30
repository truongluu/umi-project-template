/* eslint-disable compat/compat */
import moment from 'moment';

const { CLOUD_API } = process.env;

export function isArray(data) {
  if (!data) {
    return false;
  }
  return typeof data === 'object' && typeof data.length !== 'undefined';
}

export function isObject(data) {
  return typeof data === 'object' && typeof data.length === 'undefined';
}
export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function safelyParseJSON(json) {
  let parsed;

  if (json) {
    try {
      parsed = JSON.parse(json);
    } catch (e) {
      throw new Error(e);
    }
  }

  return parsed;
}

/**
 *
 * @param {object} json
 * @return {string}
 */
export function toQueryString(json) {
  return Object.keys(json)
    .map(k => `${k}=${encodeURIComponent(json[k])}`)
    .join('&');
}

/**
 *
 * @param {object} object
 * @return {FormData} {*}
 */
export function objectToFormData(object) {
  const fd = new FormData();

  Object.keys(object).forEach(k => {
    fd.append(k, object[k]);
  });

  return fd;
}

export function geoFindMe(callback) {
  if (!navigator.geolocation) {
    callback('Vị trí địa lý không được hổ trợ trên trình duyệt của bạn');
    return;
  }
  function error() {
    callback('Không thể truy xuất vị trí của bạn');
  }

  function success(position) {
    callback(false, position);
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

export function geoFindMeEffect(maps) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Vị trí địa lý không được hổ trợ trên trình duyệt của bạn'));
      return;
    }
    function error() {
      reject(new Error('Không thể truy xuất vị trí của bạn'));
    }
    function success(position) {
      const geocoder = new maps.Geocoder();
      geocoder.geocode(
        { location: { lat: position.coords.latitude, lng: position.coords.longitude } },
        (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              const point = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                address: results[0].formatted_address,
              };
              return resolve(point);
            }
          }
          return reject(new Error('Không thể lấy địa chỉ hiện tại'));
        }
      );
    }
    navigator.geolocation.getCurrentPosition(success, error);
  });
}

export function delay(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
}

export function roundFloatNumberWithDigits(number, digits = 1) {
  return Number(number).toFixed(digits);
}

export function randomNumber(length = 10) {
  let lengthInput = length;
  const numberArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomStr = '';
  const numberLength = 10;
  while (lengthInput-- > 0) {
    randomStr += numberArr[Math.floor(Math.random() * numberLength)];
  }

  return randomStr;
}

export function reloadFirebaseMessagingServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(r => {
      if (r[0] && r[0].active && /firebase-messaging-sw.js$/.test(r[0].active.scriptURL)) {
        r[0].unregister();
      }
    });
  }
}


export function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

export function characterRange(startChar, endChar) {
  return String.fromCharCode(...range(endChar.charCodeAt(0) -
    startChar.charCodeAt(0), startChar.charCodeAt(0))) + endChar
}

export function getContinueAphabet() {
  const characters = characterRange('A', 'Z');

  const charL = characters.length;
  let charCounter = 0;
  let charTemp;
  return () => {
    charTemp = characters[charCounter++];
    charCounter %= charL;
    return charTemp;
  };
}

export function getFileUrl(fileData, size) {
  let filePath = '';
  if (!fileData) {
    return '';
  }
  if (typeof fileData === 'string') {
    filePath = fileData;
  } else if (size
    && fileData.metadata
    && fileData.metadata[size]) {
    filePath = fileData.metadata[size];
  } else if (!size && fileData.path) {
    filePath = fileData.path;
  }
  return `${CLOUD_API}${filePath}`;
}

export function changeHistoryCall(fn, pathname) {
  const { pathname: oldPathname } = window.g_app._store.getState().router.location;
  if (oldPathname !== pathname) {
    fn();
  }
}

export function htmlentitiesEncode(str) {
  const buf = [];
  for (let i = str.length - 1; i >= 0; i--) {
    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
  }

  return buf.join('');
}

export function htmlentitiesDecode(str) {
  return str.replace(/&#(\d+);/g, function (match, dec) {
    return String.fromCharCode(dec);
  });
}
export function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function decodeHtml(str) {
  const map = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'"
  };
  return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) { return map[m]; });
}

export function timeAgo(time) {
  let timeOut = '';
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      timeOut = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) timeOut = time.getTime();
      break;
    default:
      timeOut = +new Date();
  }
  const timeFormats = [
    [60, 'Giây', 1], // 60
    [120, 'Phút trước', '1 Phút'], // 60*2
    [3600, 'Phút', 60], // 60*60, 60
    [7200, 'Giờ trước', '1 Giờ'], // 60*60*2
    [86400, 'Giờ', 3600], // 60*60*24, 60*60
    [172800, 'Hôm qua', 'Ngày mai'], // 60*60*24*2
    [604800, 'Ngày', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Tuần trước', 'Tuần tới'], // 60*60*24*7*4*2
    [2419200, 'Tuần', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Tháng trước', 'Tháng tới'], // 60*60*24*7*4*2
    [29030400, 'Tháng', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Năm trước', 'Năm tới'], // 60*60*24*7*4*12*2
    [2903040000, 'Năm', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
  ];
  let seconds = (+new Date() - timeOut) / 1000;
  let token = 'trước';
  let listChoice = 1;

  if (seconds === 0) {
    return 'Vừa xong'
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'từ giờ';
    listChoice = 2;
  }
  let i = 0;
  let format;
  // eslint-disable-next-line no-cond-assign
  while (format = timeFormats[i++]) {
    if (seconds < format[0]) {
      if (typeof format[2] === 'string') {
        return format[listChoice];
      }
      return `${Math.floor(seconds / format[2])} ${format[1]} ${token}`;
    }
  }
  return timeOut;
}

export function saveAs(uri, filename) {
  const link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
// 按位加法
export default function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let carry = 0; // 进位
  let ret = ''; // 结果

  while (i >= 0 || j >= 0) {
    let x = 0; // a 当前 位数上的值
    let y = 0; // b 当前 位数上的值
    let sum; // 两次求和的值

    if (i >= 0) {
      x = a[i] - '0';
      i --;
    }

    if (j >= 0) {
      y = b[j] - '0';
      j --;
    }

    sum = x + y + carry;

    if (sum >= 10) {
      carry = 1;
      sum -= 10;
    } else {
      carry = 0;
    }

    ret = sum + ret;
  }

  if (carry) {
    ret = carry + ret;
  }

  return ret;
}

// console.log(add('999', '1'))
// console.log(add('1', '999999999999999999999999999999999'))

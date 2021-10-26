const customerData = {
  1920: {
    name: '김태희',
    id: '1920',
    usage: {
      2016: {
        1: 50,
        2: 55,
        // 나머지 달(month)는 생략
      },
      2015: {
        1: 70,
        2: 63,
      },
    },
  },
  38673: {
    name: '다른 고객',
    // ... 다른고객의 정보
  },
};

// 쓰기 예
customerData[customerID].usages[year][month] = amount;
// 읽기 예
function compareUsage(customerID, laterYear, month) {
  const later = customerData;
}

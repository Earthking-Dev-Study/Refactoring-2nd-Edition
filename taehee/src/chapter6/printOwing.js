function printOwing(invoice) {
  let outstanding = 0;

  console.log('***************');
  console.log('**** 고객 채무 ****');
  console.log('***************');

  // 미해결 채무(outstanding)를 계산한다.
  for (const o of invoice.orders) {
    outstanding += o.amount;
  }

  const today =

}

const fs = require('fs');
const path = require('path');

// 主函数
function main() {
  console.log("Json file is ", path.join(__dirname, '../app/keywords.json'));
  console.log("Just use AI to generate keywords.json!");
}

// 运行主函数
main();

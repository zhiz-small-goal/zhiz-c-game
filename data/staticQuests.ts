
import { StaticQuestData } from '../types';

export const STATIC_QUESTS: Record<string, StaticQuestData> = {
  // ==========================================
  // Region 1: Plains (Basics) - 草莓语法地
  // ==========================================
  'basics_1': {
    title: "你好世界",
    storyContext: "欢迎来到代码魔法世界！每一位伟大的魔法师，都是从向世界问好开始的。",
    lessonContent: "使用 `std::cout` 发出你的声音！\n`#include <iostream>` 是魔法起手式。\n`main` 是咒语的起点。",
    hint: "别忘了分号 ; 它是咒语的结束符。",
    challenges: [
      { question: "下面的代码会输出什么？", type: "multiple-choice", options: ["Hello World", "Hello", "World", "什么都不输出"], codeSnippet: `std::cout << "Hello"; // std::cout << " World";`, correctAnswer: "Hello" },
      { question: "修复代码错误，让它输出 Hello", type: "code-fix", codeSnippet: `#include <iostream>\nint main() {\n  std::cout >> "Hello";\n  return 0;\n}`, correctAnswer: `#include <iostream>\nint main() {\n  std::cout << "Hello";\n  return 0;\n}` },
      { question: "C++ 程序从哪里开始执行？", type: "multiple-choice", options: ["start()", "main()", "begin()"], correctAnswer: "main()" },
      { question: "【角度：语法】如果没有 `#include <iostream>` 会怎样？", type: "multiple-choice", options: ["报错(编译失败)", "正常运行", "无法输出"], correctAnswer: "报错(编译失败)" },
      { question: "【角度：细节】`Main()` 能作为入口函数吗？（注意大小写）", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" }
    ]
  },
  'basics_1_quiz': {
    title: "练习:问好",
    storyContext: "这里是魔法训练场！没有新的知识，只有挑战。",
    lessonContent: "准备好检验你的基础了吗？加油！",
    hint: "注意符号的方向 <<",
    challenges: [
      { question: "单行注释用什么符号？", type: "multiple-choice", options: ["//", "**", "--"], correctAnswer: "//" },
      { question: "修复代码：漏了分号", type: "code-fix", codeSnippet: `cout << "Hi"`, correctAnswer: `cout << "Hi";` },
      { question: "多行注释是？", type: "multiple-choice", options: ["/* ... */", "// ... //"], correctAnswer: "/* ... */" },
      { question: "预处理指令通常以什么开头？", type: "multiple-choice", options: ["#", "@", "$"], correctAnswer: "#" },
      { question: "【角度：纠错】`std::cout` 少了 `std::` 会怎样（没写 using namespace）？", type: "multiple-choice", options: ["报错", "自动识别"], correctAnswer: "报错" }
    ]
  },
  'basics_var': {
    title: "神奇盒子",
    storyContext: "变量就是贴了标签的魔法盒子，可以把星星装进去。",
    lessonContent: "`int` 盒子放整数，`double` 盒子放小数。\n赋值就像把东西放进盒子里。",
    hint: "变量名不能以数字开头哦。",
    challenges: [
       { question: "定义一个整数变量 score 并赋值 100", type: "code-fix", codeSnippet: `score = 100;`, correctAnswer: `int score = 100;` },
       { question: "哪个变量名是合法的？", type: "multiple-choice", options: ["2name", "my_name", "int"], correctAnswer: "my_name" },
       { question: "一行定义多个变量", type: "code-fix", codeSnippet: `int a, b = 10;`, correctAnswer: `int a = 10, b = 10;` },
       { question: "【角度：逻辑】代码 `10 = x;` 对吗？", type: "multiple-choice", options: ["不对，数字不能被赋值", "对"], correctAnswer: "不对，数字不能被赋值" },
       { question: "【角度：作用域】可以连续定义两次 `int a;` 吗？", type: "multiple-choice", options: ["不行(重定义)", "可以"], correctAnswer: "不行(重定义)" }
    ]
  },
  'basics_var_quiz': {
    title: "练习:变量",
    storyContext: "训练场：盒子的艺术。",
    lessonContent: "巩固变量定义与初始化。",
    hint: "类型转换会丢失精度。",
    challenges: [
       { question: "`int a = 3.9;` a 的值是？", type: "multiple-choice", options: ["3", "4", "3.9", "报错"], correctAnswer: "3" },
       { question: "修复变量定义错误", type: "code-fix", codeSnippet: `integer x = 5;`, correctAnswer: `int x = 5;` },
       { question: "未初始化的 `int x;` 值是多少？", type: "multiple-choice", options: ["0", "不确定(垃圾值)", "1", "null"], correctAnswer: "不确定(垃圾值)" },
       { question: "变量名区分大小写吗？", type: "multiple-choice", options: ["区分", "不区分"], correctAnswer: "区分" },
       { question: "【角度：预测】`int a=5; a=10;` 最后a是多少？", type: "multiple-choice", options: ["10", "5"], correctAnswer: "10" }
    ]
  },
  'basics_type': {
    title: "糖果分类",
    storyContext: "不同的糖果要放在不同的罐子里，放错了会融化哦！",
    lessonContent: "`char` 是单个字符，要用单引号 `'A'`。\n`string` 是字符串，要用双引号 `\"Hello\"`。\n`bool` 只有真和假。",
    hint: "单引号 vs 双引号。",
    challenges: [
       { question: "'A' 是什么类型？", type: "multiple-choice", options: ["char", "string", "int"], correctAnswer: "char" },
       { question: "修复类型错误：字符要用单引号", type: "code-fix", codeSnippet: `char c = "A";`, correctAnswer: `char c = 'A';` },
       { question: "sizeof(int) 通常是几个字节？", type: "multiple-choice", options: ["4", "2", "8"], correctAnswer: "4" },
       { question: "【角度：对比】`float` 和 `double` 谁精度高？", type: "multiple-choice", options: ["double", "float"], correctAnswer: "double" }
    ]
  },
  'basics_type_quiz': {
    title: "练习:类型",
    storyContext: "训练场：挑剔的罐子。",
    lessonContent: "类型匹配练习。",
    hint: "true 是 1，false 是 0。",
    challenges: [
       { question: "布尔类型 bool 只有哪两个值？", type: "multiple-choice", options: ["true/false", "1/0", "yes/no"], correctAnswer: "true/false" },
       { question: "`string s = 'Hello';` 对吗？", type: "multiple-choice", options: ["不对，要双引号", "对"], correctAnswer: "不对，要双引号" },
       { question: "强制类型转换：`(int)5.5`", type: "multiple-choice", options: ["5", "6", "5.5"], correctAnswer: "5" },
       { question: "`bool b = 100;` b 是真还是假？", type: "multiple-choice", options: ["true", "false"], correctAnswer: "true" },
       { question: "【角度：内存】`char` 占几个字节？", type: "multiple-choice", options: ["1", "2", "4"], correctAnswer: "1" }
    ]
  },
  'basics_op': {
    title: "星星加减",
    storyContext: "魔法数学课！数字也可以跳舞。",
    lessonContent: "+ - * / 是基本运算。\n`%` 是取余数（分糖果剩下的）。\n`++` 是让变量自己变大 1。",
    hint: "整数除以整数，结果还是整数。",
    challenges: [
       { question: "`10 / 3` 等于多少？", type: "multiple-choice", options: ["3", "3.33", "4"], correctAnswer: "3" },
       { question: "修复取模运算符号", type: "code-fix", codeSnippet: `int x = 10 /% 3;`, correctAnswer: `int x = 10 % 3;` },
       { question: "`5 % 2` 是？", type: "multiple-choice", options: ["1", "2.5", "0"], correctAnswer: "1" },
       { question: "【角度：优先级】`2 + 3 * 4` 等于？", type: "multiple-choice", options: ["14", "20"], correctAnswer: "14" }
    ]
  },
  'basics_op_quiz': {
    title: "练习:运算",
    storyContext: "训练场：数学体操。",
    lessonContent: "运算符优先级与自增。",
    hint: "x++ 先用后加，++x 先加后用。",
    challenges: [
       { question: "`int x=5; int y=x++;` y 是？", type: "multiple-choice", options: ["5", "6"], correctAnswer: "5" },
       { question: "`int x=5; int y=++x;` y 是？", type: "multiple-choice", options: ["6", "5"], correctAnswer: "6" },
       { question: "`10 % 2` 是？", type: "multiple-choice", options: ["0", "1", "5"], correctAnswer: "0" },
       { question: "`a += 5` 等价于？", type: "code-fix", codeSnippet: `a = a + 5;`, correctAnswer: `a = a + 5;` },
       { question: "【角度：类型】`1.0 / 2` 等于？", type: "multiple-choice", options: ["0.5", "0"], correctAnswer: "0.5" }
    ]
  },
  'basics_io': {
    title: "大树说话",
    storyContext: "不仅要会说(cout)，还要会听(cin)。大树爷爷会听你的秘密。",
    lessonContent: "`std::cin >> x;` 把听到的存进 x。\n`>>` 像是把信息流进变量里。",
    hint: "cin 的箭头指向变量 >>",
    challenges: [
       { question: "修复输入语句", type: "code-fix", codeSnippet: `cin << x;`, correctAnswer: `cin >> x;` },
       { question: "cin 遇到空格会停止读取吗？", type: "multiple-choice", options: ["会", "不会"], correctAnswer: "会" },
       { question: "如何输入带空格的一整行？", type: "multiple-choice", options: ["getline(cin, s)", "cin >> s"], correctAnswer: "getline(cin, s)" },
       { question: "【角度：级联】可以写 `cin >> a >> b;` 吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" }
    ]
  },
  'basics_io_quiz': {
    title: "练习:IO",
    storyContext: "训练场：回声谷。",
    lessonContent: "IO 进阶。",
    hint: "endl 会换行。",
    challenges: [
       { question: "连续输入两个数：", type: "code-fix", codeSnippet: `cin >> a, b;`, correctAnswer: `cin >> a >> b;` },
       { question: "输出换行用什么？", type: "multiple-choice", options: ["endl", "end", "next"], correctAnswer: "endl" },
       { question: "打印双引号需要转义吗？", type: "multiple-choice", options: ["需要 \\\"", "不需要"], correctAnswer: "需要 \\\"" },
       { question: "cout 是哪个命名空间的？", type: "multiple-choice", options: ["std", "system"], correctAnswer: "std" }
    ]
  },
  'basics_math': {
    title: "魔法算术",
    storyContext: "高级魔法师需要精准计算咒语的能量。",
    lessonContent: "引入 `#include <cmath>` 就能使用强大的数学魔法。\n`sqrt(x)` 开根号，`pow(a, b)` 计算 a 的 b 次方，`abs(x)` 绝对值。",
    hint: "平方根是 square root (sqrt)。",
    challenges: [
      { question: "使用哪个库函数？", type: "multiple-choice", options: ["<cmath>", "<math>", "<calc>"], correctAnswer: "<cmath>" },
      { question: "计算 2 的 3 次方：", type: "code-fix", codeSnippet: `pow(2, 3)`, correctAnswer: `pow(2, 3)` },
      { question: "`sqrt(16)` 的结果是？", type: "multiple-choice", options: ["4", "8"], correctAnswer: "4" }
    ]
  },
  'basics_math_quiz': {
    title: "练习:算术",
    storyContext: "训练场：计算房。",
    lessonContent: "数学函数练习。",
    hint: "abs 是绝对值。",
    challenges: [
      { question: "`abs(-10)` 的值？", type: "multiple-choice", options: ["10", "-10"], correctAnswer: "10" },
      { question: "`ceil(3.2)` (向上取整) 是？", type: "multiple-choice", options: ["4", "3"], correctAnswer: "4" },
      { question: "`floor(3.9)` (向下取整) 是？", type: "multiple-choice", options: ["3", "4"], correctAnswer: "3" },
      { question: "sin/cos 函数的参数是？", type: "multiple-choice", options: ["弧度", "角度"], correctAnswer: "弧度" }
    ]
  },

  // BOSS EXAM 1: PLAINS
  'plains_exam': {
    title: "【BOSS】语法试炼",
    storyContext: "草莓地的守护者出现了！它要考验你的基本功。",
    lessonContent: "这是第一区域的综合测试，包含变量、类型、运算、IO。",
    hint: "细心！",
    challenges: [
      { question: "1. 综合：`double c = 7/2;` c 的值是？", type: "multiple-choice", options: ["3.0", "3.5", "4.0"], correctAnswer: "3.0" },
      { question: "2. 综合：修复 IO 代码", type: "code-fix", codeSnippet: `cout >> "Age:"; cin << age;`, correctAnswer: `cout << "Age:"; cin >> age;` },
      { question: "3. 综合：`int x=5; x+=2;` x现在是？", type: "multiple-choice", options: ["7", "5", "2"], correctAnswer: "7" },
      { question: "4. 综合：ASCII码转换，(int)'A' 是多少？", type: "multiple-choice", options: ["65", "97", "0"], correctAnswer: "65" },
      { question: "5. 综合：哪个变量名非法？", type: "multiple-choice", options: ["8ball", "ball8", "_ball"], correctAnswer: "8ball" },
      { question: "6. 综合：`bool b = 10 > 5;` b 是？", type: "multiple-choice", options: ["true", "false"], correctAnswer: "true" },
      { question: "7. 综合：每条语句结束需要？", type: "multiple-choice", options: [";", ".", ":"], correctAnswer: ";" },
      { question: "8. 综合：单行注释符号？", type: "multiple-choice", options: ["//", "/*", "#"], correctAnswer: "//" }
    ]
  },

  // ==========================================
  // Region 2: Forest (Control Flow) - 糖果循环林
  // ==========================================
  'flow_if': {
    title: "分岔小路",
    storyContext: "如果下雨就撑伞，如果天晴就戴帽。",
    lessonContent: "`if (条件) { ... } else { ... }`\n逻辑就像走路遇到分岔口。",
    hint: "条件用圆括号 () 包起来。",
    challenges: [
       { question: "修复 if 语法：缺了括号", type: "code-fix", codeSnippet: `if x > 5 { }`, correctAnswer: `if (x > 5) { }` },
       { question: "else 能单独使用吗？", type: "multiple-choice", options: ["不能，必须跟 if", "能"], correctAnswer: "不能，必须跟 if" },
       { question: "三目运算符：`a>b ? a : b`", type: "multiple-choice", options: ["取最大值", "取最小值"], correctAnswer: "取最大值" },
       { question: "【角度：真假】`if(1)` 会执行吗？", type: "multiple-choice", options: ["会(视为真)", "不会"], correctAnswer: "会(视为真)" },
       { question: "【角度：作用域】if 里面定义的变量，else 里能用吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" }
    ]
  },
  'flow_if_quiz': {
    title: "练习:If",
    storyContext: "训练场：迷宫入口。",
    lessonContent: "条件判断进阶。",
    hint: "== 是判断相等，= 是赋值。",
    challenges: [
       { question: "`if (a = 5)` 是判断相等吗？", type: "multiple-choice", options: ["不是，是赋值", "是"], correctAnswer: "不是，是赋值" },
       { question: "修复比较：判断x是否等于10", type: "code-fix", codeSnippet: `if (x = 10) cout << "Ten";`, correctAnswer: `if (x == 10) cout << "Ten";` },
       { question: "逻辑与是哪个符号？", type: "multiple-choice", options: ["&&", "||", "&"], correctAnswer: "&&" },
       { question: "`!true` 是？", type: "multiple-choice", options: ["false", "true"], correctAnswer: "false" }
    ]
  },
  'flow_switch': {
    title: "分院帽",
    storyContext: "根据你的数字，把你分到不同的学院。",
    lessonContent: "`switch(n) { case 1: ... break; }`\n用来处理多选一的情况。",
    hint: "别忘了 break，否则会掉下去！",
    challenges: [
       { question: "修复 switch：缺 break", type: "code-fix", codeSnippet: `switch(x) { case 1: cout << "1"; }`, correctAnswer: `switch(x) { case 1: cout << "1"; break; }` },
       { question: "default 分支是必须的吗？", type: "multiple-choice", options: ["不是", "是"], correctAnswer: "不是" },
       { question: "【角度：效率】switch 通常比 if-else 链快吗？", type: "multiple-choice", options: ["是(有跳转表优化)", "否"], correctAnswer: "是(有跳转表优化)" }
    ]
  },
  'flow_switch_quiz': {
    title: "练习:Switch",
    storyContext: "训练场：多重门。",
    lessonContent: "Switch 细节。",
    hint: "case 后面跟冒号 :",
    challenges: [
       { question: "修复语法错误", type: "code-fix", codeSnippet: `case 1;`, correctAnswer: `case 1:` },
       { question: "switch 能判断 double 吗？", type: "multiple-choice", options: ["不能，只能整型/枚举", "能"], correctAnswer: "不能，只能整型/枚举" },
       { question: "case 后面必须是？", type: "multiple-choice", options: ["常量", "变量"], correctAnswer: "常量" },
       { question: "如果没有 break 会发生什么？", type: "multiple-choice", options: ["Case穿透", "报错"], correctAnswer: "Case穿透" }
    ]
  },
  'flow_for': {
    title: "旋转木马",
    storyContext: "转了一圈又一圈，直到音乐停止。",
    lessonContent: "`for (开始; 条件; 每圈变化) { ... }`\n最常用的循环魔法。",
    hint: "分号隔开三个部分。",
    challenges: [
       { question: "循环 10 次", type: "code-fix", codeSnippet: `for(int i=0; i<10) {}`, correctAnswer: `for(int i=0; i<10; i++) {}` },
       { question: "`i++` 什么时候执行？", type: "multiple-choice", options: ["每圈结束后", "开始前", "中间"], correctAnswer: "每圈结束后" },
       { question: "倒序循环怎么写？", type: "code-fix", codeSnippet: `for(int i=10; i>0; i++)`, correctAnswer: `for(int i=10; i>0; i--)` },
       { question: "【角度：作用域】for(int i...) 中 i 在循环外能用吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" }
    ]
  },
  'flow_for_quiz': {
    title: "练习:For",
    storyContext: "训练场：跑圈。",
    lessonContent: "For 循环陷阱。",
    hint: "注意循环次数。",
    challenges: [
       { question: "`for(int i=0; i<=5; i++)` 执行几次？", type: "multiple-choice", options: ["6", "5"], correctAnswer: "6" },
       { question: "死循环怎么写？", type: "code-fix", codeSnippet: `for(;;;) {}`, correctAnswer: `for(;;) {}` },
       { question: "可以在 for 里面定义变量吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
       { question: "双重循环：外层3次，内层4次，共几次？", type: "multiple-choice", options: ["12", "7"], correctAnswer: "12" }
    ]
  },
  'flow_while': {
    title: "不停奔跑",
    storyContext: "只要还有力气，就一直跑。",
    lessonContent: "`while (条件) { ... }`\n适合不知道要跑多少圈的时候。",
    hint: "小心死循环！记得在循环里改变条件。",
    challenges: [
       { question: "修复死循环：x 永远大于0", type: "code-fix", codeSnippet: `int x=5; while(x>0) { cout << x; }`, correctAnswer: `int x=5; while(x>0) { cout << x; x--; }` },
       { question: "do-while 至少执行几次？", type: "multiple-choice", options: ["1次", "0次"], correctAnswer: "1次" },
       { question: "【角度：场景】不知道循环次数时用谁？", type: "multiple-choice", options: ["while", "for"], correctAnswer: "while" }
    ]
  },
  'flow_while_quiz': {
    title: "练习:While",
    storyContext: "训练场：耐力跑。",
    lessonContent: "While 进阶。",
    hint: "条件在括号里。",
    challenges: [
       { question: "修复语法：少了括号", type: "code-fix", codeSnippet: `while x < 10 {}`, correctAnswer: `while (x < 10) {}` },
       { question: "while 和 for 可以互换吗？", type: "multiple-choice", options: ["可以", "不行"], correctAnswer: "可以" },
       { question: "`while(false)` 会执行吗？", type: "multiple-choice", options: ["不会", "会"], correctAnswer: "不会" },
       { question: "`do { } while(false);` 执行几次？", type: "multiple-choice", options: ["1", "0"], correctAnswer: "1" }
    ]
  },
  'flow_break': {
    title: "暂停怀表",
    storyContext: "Break 是立即停止，Continue 是跳过这次。",
    lessonContent: "`break;` 跳出循环，`continue;` 马上开始下一圈。",
    hint: "break 只能跳出一层循环。",
    challenges: [
       { question: "想跳过偶数", type: "code-fix", codeSnippet: `if (i%2==0) break;`, correctAnswer: `if (i%2==0) continue;` },
       { question: "break 会结束整个程序吗？", type: "multiple-choice", options: ["不会，只结束循环", "会"], correctAnswer: "不会，只结束循环" }
    ]
  },
  'flow_break_quiz': {
    title: "练习:Break",
    storyContext: "训练场：急停。",
    lessonContent: "控制跳转。",
    hint: "不要滥用 goto。",
    challenges: [
       { question: "嵌套循环中 break 跳出几层？", type: "multiple-choice", options: ["当前这一层", "所有层"], correctAnswer: "当前这一层" },
       { question: "无限循环中必须用什么退出？", type: "multiple-choice", options: ["break", "continue"], correctAnswer: "break" },
       { question: "continue 能用于 switch 吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" }
    ]
  },
  'flow_nested': {
    title: "星阵循环",
    storyContext: "我们要画出一个星星方阵。循环里面套循环，就像时钟的分针和秒针。",
    lessonContent: "嵌套循环：\n`for(int i=0; i<3; i++) { for(int j=0; j<3; j++) ... }`\n外层走一步，内层跑一圈。",
    hint: "注意不要把 i 和 j 搞混了。",
    challenges: [
       { question: "打印 3x3 的星星矩阵", type: "code-fix", codeSnippet: `for(int i=0; i<3; i++) {\n  for(int j=0; j<3; j++) cout << "*";\n  cout << endl;\n}`, correctAnswer: `for(int i=0; i<3; i++) {\n  for(int j=0; j<3; j++) cout << "*";\n  cout << endl;\n}` },
       { question: "外层 3 次，内层 2 次，总共循环几次？", type: "multiple-choice", options: ["6", "5", "3"], correctAnswer: "6" },
       { question: "通常内层循环变量命名为？", type: "multiple-choice", options: ["j", "i", "k"], correctAnswer: "j" }
    ]
  },
  'flow_nested_quiz': {
    title: "练习:星阵",
    storyContext: "训练场：多维空间。",
    lessonContent: "嵌套循环练习。",
    hint: "时间复杂度 O(n^2)。",
    challenges: [
      { question: "九九乘法表需要几层循环？", type: "multiple-choice", options: ["2", "1", "9"], correctAnswer: "2" },
      { question: "break 在内层循环会跳出外层吗？", type: "multiple-choice", options: ["不会", "会"], correctAnswer: "不会" },
      { question: "三层循环效率高吗？", type: "multiple-choice", options: ["通常很低", "很高"], correctAnswer: "通常很低" },
      { question: "如果内层循环条件依赖外层 `j < i`，这是？", type: "multiple-choice", options: ["三角形逻辑", "矩形逻辑"], correctAnswer: "三角形逻辑" }
    ]
  },

  // BOSS EXAM 2: FOREST
  'forest_exam': {
    title: "【BOSS】循环试炼",
    storyContext: "树人守卫挡住了去路！必须解开它的循环谜题才能通过。",
    lessonContent: "控制流综合测试。",
    hint: "画流程图会有帮助。",
    challenges: [
      { question: "1. 综合：`for(int i=0; i<3; i++) cout<<i;` 输出？", type: "multiple-choice", options: ["012", "123", "0123"], correctAnswer: "012" },
      { question: "2. 综合：switch 忘记 break 会怎样？", type: "multiple-choice", options: ["继续执行下一个 case (穿透)", "报错", "退出"], correctAnswer: "继续执行下一个 case (穿透)" },
      { question: "3. 综合：修复死循环", type: "code-fix", codeSnippet: `while(true) { if(x>10) continue; break; }`, correctAnswer: `while(true) { if(x>10) break; break; }` },
      { question: "4. 综合：`do { } while(0);` 执行几次？", type: "multiple-choice", options: ["1", "0"], correctAnswer: "1" },
      { question: "5. 综合：双重循环 3x3 总共几次？", type: "multiple-choice", options: ["9", "6", "3"], correctAnswer: "9" },
      { question: "6. 综合：`if(a=0)` 结果是真还是假？", type: "multiple-choice", options: ["假", "真"], correctAnswer: "假" },
      { question: "7. 综合：continue 后的代码会执行吗？", type: "multiple-choice", options: ["不会", "会"], correctAnswer: "不会" },
      { question: "8. 综合：用什么关键字定义常量？", type: "multiple-choice", options: ["const", "fixed", "static"], correctAnswer: "const" }
    ]
  },

  // ==========================================
  // Region 3: Fortress (Functions) - 云朵函数城
  // ==========================================
  'func_base': {
    title: "小小咒语",
    storyContext: "把常用的魔法打包成一个新咒语，以后只要念名字就能发动。",
    lessonContent: "函数定义：`返回类型 名字() { ... }`\n`void` 表示不返回任何东西。",
    hint: "大括号 {} 里是咒语的内容。",
    challenges: [
       { question: "定义一个名为 hello 的空函数", type: "code-fix", codeSnippet: `func hello() {}`, correctAnswer: `void hello() {}` },
       { question: "函数必须有返回值吗？", type: "multiple-choice", options: ["void类型不需要", "必须有"], correctAnswer: "void类型不需要" },
       { question: "函数体用什么包围？", type: "multiple-choice", options: ["{}", "[]", "()"], correctAnswer: "{}" },
       { question: "【角度：调用】执行函数是 `hello` 还是 `hello()`？", type: "multiple-choice", options: ["hello()", "hello"], correctAnswer: "hello()" }
    ]
  },
  'func_base_quiz': {
    title: "练习:Base",
    storyContext: "训练场：咒语书写。",
    lessonContent: "函数基础练习。",
    hint: "先声明，后调用。",
    challenges: [
      { question: "main 函数返回什么类型？", type: "multiple-choice", options: ["int", "void"], correctAnswer: "int" },
      { question: "调用函数用什么符号？", type: "multiple-choice", options: ["()", "[]"], correctAnswer: "()" },
      { question: "函数名命名规则同变量名吗？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" },
      { question: "修复调用错误", type: "code-fix", codeSnippet: `hello;`, correctAnswer: `hello();` }
    ]
  },
  'func_param': {
    title: "魔力传递",
    storyContext: "给咒语传递能量，让它变得不同。",
    lessonContent: "`void run(int speed)`\n括号里的就是参数。",
    hint: "类型 名字，逗号隔开。",
    challenges: [
       { question: "修复参数定义", type: "code-fix", codeSnippet: `void f(x int) {}`, correctAnswer: `void f(int x) {}` },
       { question: "参数可以有多个吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
       { question: "形参和实参是同一个内存吗（默认情况）？", type: "multiple-choice", options: ["不是(拷贝)", "是"], correctAnswer: "不是(拷贝)" }
    ]
  },
  'func_param_quiz': {
    title: "练习:Param",
    storyContext: "训练场：传球游戏。",
    lessonContent: "参数传递细节。",
    hint: "值传递 vs 引用传递。",
    challenges: [
      { question: "两个参数用什么隔开？", type: "multiple-choice", options: [",", ";"], correctAnswer: "," },
      { question: "值传递会修改原来的变量吗？", type: "multiple-choice", options: ["不会", "会"], correctAnswer: "不会" },
      { question: "修复多参数定义", type: "code-fix", codeSnippet: `void f(int a; int b) {}`, correctAnswer: `void f(int a, int b) {}` },
      { question: "可以没有参数吗？", type: "multiple-choice", options: ["可以", "必须有"], correctAnswer: "可以" }
    ]
  },
  'func_ret': {
    title: "带回礼物",
    storyContext: "咒语念完，变出我们要的东西带回来。",
    lessonContent: "`return 结果;`\n函数名前面的类型要和 return 的东西一致。",
    hint: "return 会立即结束函数。",
    challenges: [
       { question: "修复返回值类型错误", type: "code-fix", codeSnippet: `int f() { return "Hi"; }`, correctAnswer: `string f() { return "Hi"; }` },
       { question: "return 会结束函数吗？", type: "multiple-choice", options: ["会", "不会"], correctAnswer: "会" },
       { question: "void 函数能 return 吗？", type: "multiple-choice", options: ["能(return;)", "不能"], correctAnswer: "能(return;)" }
    ]
  },
  'func_ret_quiz': {
    title: "练习:Ret",
    storyContext: "训练场：收礼物。",
    lessonContent: "返回值练习。",
    hint: "类型一致性。",
    challenges: [
      { question: "没有 return 的 int 函数安全吗？", type: "multiple-choice", options: ["不安全", "安全"], correctAnswer: "不安全" },
      { question: "可以 return 多个值吗？", type: "multiple-choice", options: ["不可以(除非结构体)", "可以"], correctAnswer: "不可以(除非结构体)" },
      { question: "`return 1+2;` 会返回什么？", type: "multiple-choice", options: ["3", "1+2"], correctAnswer: "3" },
      { question: "函数执行完会自动返回吗？", type: "multiple-choice", options: ["会(void)", "不会"], correctAnswer: "会(void)" }
    ]
  },
  'func_ovr': {
    title: "百变魔法",
    storyContext: "同一个咒语名字，对不同东西有不同效果。",
    lessonContent: "函数重载：名字相同，参数不同（类型或数量）。\n编译器很聪明，知道你叫的是哪个。",
    hint: "返回值不同不算重载！",
    challenges: [
       { question: "这算重载吗？`void f(int)` 和 `int f(int)`", type: "multiple-choice", options: ["不算(返回值不同不行)", "算"], correctAnswer: "不算(返回值不同不行)" },
       { question: "这算重载吗？`f(int)` 和 `f(double)`", type: "multiple-choice", options: ["算", "不算"], correctAnswer: "算" },
       { question: "这算重载吗？`f(int)` 和 `f(int, int)`", type: "multiple-choice", options: ["算", "不算"], correctAnswer: "算" }
    ]
  },
  'func_ovr_quiz': {
    title: "练习:Ovr",
    storyContext: "训练场：分身术。",
    lessonContent: "重载辨析。",
    hint: "签名 = 名字 + 参数。",
    challenges: [
      { question: "编译器根据什么区分重载？", type: "multiple-choice", options: ["参数列表", "返回值"], correctAnswer: "参数列表" },
      { question: "重载函数必须在同一个作用域吗？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" },
      { question: "`f(1)` 会调用 `f(int)` 还是 `f(double)`？", type: "multiple-choice", options: ["f(int)", "f(double)"], correctAnswer: "f(int)" },
      { question: "二义性是指？", type: "multiple-choice", options: ["编译器不知道调哪个", "函数名太长"], correctAnswer: "编译器不知道调哪个" }
    ]
  },
  'func_scope': {
    title: "秘密花园",
    storyContext: "有些魔法只能在花园里用，出了门就失效了。",
    lessonContent: "局部变量：在 `{}` 里定义，外面看不见。\n全局变量：在外面定义，大家都能用。",
    hint: "就近原则：名字一样时，优先用最近的。",
    challenges: [
       { question: "局部变量出了大括号还能用吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
       { question: "全局变量在哪定义？", type: "multiple-choice", options: ["函数外面", "函数里面"], correctAnswer: "函数外面" },
       { question: "修复作用域错误", type: "code-fix", codeSnippet: `void f() { int x=1; } void g() { x=2; }`, correctAnswer: `void f() { int x=1; } void g() { int x=2; }` }
    ]
  },
  'func_scope_quiz': {
    title: "练习:Scope",
    storyContext: "训练场：领地意识。",
    lessonContent: "作用域与生命周期。",
    hint: "static 变量活得久。",
    challenges: [
      { question: "如果局部和全局同名，优先用谁？", type: "multiple-choice", options: ["局部", "全局"], correctAnswer: "局部" },
      { question: "for循环里定义的 `int i` 循环外能用吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
      { question: "static 局部变量会销毁吗？", type: "multiple-choice", options: ["程序结束才销毁", "函数结束就销毁"], correctAnswer: "程序结束才销毁" },
      { question: "全局变量建议多用吗？", type: "multiple-choice", options: ["少用(不安全)", "多用"], correctAnswer: "少用(不安全)" }
    ]
  },
  'func_rec': {
    title: "无限镜子",
    storyContext: "在镜子里看镜子，会有无数个你。这就是递归魔法！",
    lessonContent: "递归：函数自己调用自己。\n必须有一个**终止条件**（出口），否则会永远停不下来！",
    hint: "没有出口的递归会导致栈溢出（Stack Overflow）。",
    challenges: [
       { question: "计算阶乘 5! = 5*4*3*2*1", type: "code-fix", codeSnippet: `int f(int n) { if(n==1) return 1; return n * f(n-1); }`, correctAnswer: `int f(int n) { if(n==1) return 1; return n * f(n-1); }` },
       { question: "递归必须有什么？", type: "multiple-choice", options: ["终止条件", "循环"], correctAnswer: "终止条件" },
       { question: "递归太深会发生什么？", type: "multiple-choice", options: ["栈溢出", "死机"], correctAnswer: "栈溢出" }
    ]
  },
  'func_rec_quiz': {
    title: "练习:镜子",
    storyContext: "训练场：无底洞。",
    lessonContent: "递归练习。",
    hint: "把大问题拆成小问题。",
    challenges: [
      { question: "斐波那契数列可以用递归吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
      { question: "main 函数可以递归调用吗？", type: "multiple-choice", options: ["可以(C++允许)", "不可以"], correctAnswer: "可以(C++允许)" },
      { question: "递归和循环能互相转换吗？", type: "multiple-choice", options: ["理论上可以", "不行"], correctAnswer: "理论上可以" },
      { question: "修复死递归：", type: "code-fix", codeSnippet: `void f() { f(); }`, correctAnswer: `void f() { if(condition) return; f(); }` }
    ]
  },

  // BOSS EXAM 3: FORTRESS
  'fortress_exam': {
    title: "【BOSS】函数试炼",
    storyContext: "云朵城主正在寻找接班人。只有最严谨的法师才能通过。",
    lessonContent: "函数综合测试。",
    hint: "逻辑严密，注意细节。",
    challenges: [
      { question: "1. 综合：`void f(int a)` 参数 a 是？", type: "multiple-choice", options: ["局部变量(拷贝)", "全局变量"], correctAnswer: "局部变量(拷贝)" },
      { question: "2. 综合：修复返回值不匹配", type: "code-fix", codeSnippet: `int get() { return 3.5; }`, correctAnswer: `double get() { return 3.5; }` },
      { question: "3. 综合：重载必须满足？", type: "multiple-choice", options: ["参数列表不同", "返回值不同", "参数名不同"], correctAnswer: "参数列表不同" },
      { question: "4. 综合：全局变量默认初始化为？", type: "multiple-choice", options: ["0", "垃圾值"], correctAnswer: "0" },
      { question: "5. 综合：函数声明需要写函数体吗？", type: "multiple-choice", options: ["不需要", "需要"], correctAnswer: "不需要" },
      { question: "6. 综合：递归必须有？", type: "multiple-choice", options: ["终止条件", "循环"], correctAnswer: "终止条件" },
      { question: "7. 综合：在 `main` 之前定义的函数需要声明吗？", type: "multiple-choice", options: ["不需要", "需要"], correctAnswer: "不需要" },
      { question: "8. 综合：`return;` 用于什么函数？", type: "multiple-choice", options: ["void", "int"], correctAnswer: "void" }
    ]
  },

  // ==========================================
  // Region 4: Peaks (Data & Pointers) - 星星指针山
  // ==========================================
  'data_arr': {
    title: "星星瓶子",
    storyContext: "一排整齐的瓶子，每个瓶子都有编号。",
    lessonContent: "数组：`int a[5];` 存放5个整数。\n编号（下标）从 0 开始！",
    hint: "第一个是 a[0]，最后一个是 a[4]。",
    challenges: [
       { question: "定义 10 个整数的数组", type: "code-fix", codeSnippet: `int a(10);`, correctAnswer: `int a[10];` },
       { question: "访问第 1 个元素", type: "code-fix", codeSnippet: `a[1]`, correctAnswer: `a[0]` },
       { question: "数组大小必须是常量吗？", type: "multiple-choice", options: ["是(C++标准)", "否"], correctAnswer: "是(C++标准)" },
       { question: "【角度：越界】访问 `a[10]` (定义 `int a[10]`) 会怎样？", type: "multiple-choice", options: ["未定义行为(危险)", "自动扩容"], correctAnswer: "未定义行为(危险)" }
    ]
  },
  'data_arr_quiz': {
    title: "练习:Arr",
    storyContext: "训练场：货架管理。",
    lessonContent: "数组操作。",
    hint: "越界是很危险的！",
    challenges: [
      { question: "a[10] 越界了吗？(定义 int a[10])", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" },
      { question: "二维数组定义：3行4列", type: "code-fix", codeSnippet: `int a[3,4]`, correctAnswer: `int a[3][4]` },
      { question: "数组名代表什么？", type: "multiple-choice", options: ["数组首地址", "整个数组值"], correctAnswer: "数组首地址" },
      { question: "初始化数组：", type: "code-fix", codeSnippet: `int a[3] = (1,2,3);`, correctAnswer: `int a[3] = {1,2,3};` }
    ]
  },
  'data_str': {
    title: "魔法卷轴",
    storyContext: "文字是记录历史的魔法。",
    lessonContent: "`#include <string>`\n`string` 可以像拼积木一样 `+` 起来。",
    hint: "双引号哦。",
    challenges: [
       { question: "连接两个字符串", type: "code-fix", codeSnippet: `s1 . s2`, correctAnswer: `s1 + s2` },
       { question: "获取长度", type: "code-fix", codeSnippet: `s.len()`, correctAnswer: `s.length()` },
       { question: "string s; 默认是空串吗？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" }
    ]
  },
  'data_str_quiz': {
    title: "练习:Str",
    storyContext: "训练场：图书馆。",
    lessonContent: "字符串操作。",
    hint: "可以直接比较大小。",
    challenges: [
      { question: "`s[0]` 获取的是什么？", type: "multiple-choice", options: ["第一个字符", "第一个字符串"], correctAnswer: "第一个字符" },
      { question: "`string` 末尾有 \\0 吗？", type: "multiple-choice", options: ["有(自动管理)", "没有"], correctAnswer: "有(自动管理)" },
      { question: "比较两个字符串相等用？", type: "multiple-choice", options: ["==", "equals"], correctAnswer: "==" },
      { question: "读取一行带空格的字符串？", type: "multiple-choice", options: ["getline", "cin"], correctAnswer: "getline" }
    ]
  },
  'mem_ptr': {
    title: "寻宝罗盘",
    storyContext: "罗盘指向宝藏的位置，而不是宝藏本身。",
    lessonContent: "指针 `int* p` 存的是地址。\n`&` 取地址（制作罗盘）。\n`*` 取值（根据罗盘挖宝）。",
    hint: "& 是地址，* 是内容。",
    challenges: [
       { question: "p 是指针，获取它指向的值", type: "code-fix", codeSnippet: `&p`, correctAnswer: `*p` },
       { question: "nullptr 是什么？", type: "multiple-choice", options: ["空指针", "0"], correctAnswer: "空指针" },
       { question: "定义一个指针", type: "code-fix", codeSnippet: `int p;`, correctAnswer: `int* p;` }
    ]
  },
  'mem_ptr_quiz': {
    title: "练习:Ptr",
    storyContext: "训练场：寻宝猎人。",
    lessonContent: "指针进阶。",
    hint: "野指针很危险。",
    challenges: [
      { question: "`int a=10; int* p=&a;` *p 是？", type: "multiple-choice", options: ["10", "地址"], correctAnswer: "10" },
      { question: "指针的大小通常是？(64位)", type: "multiple-choice", options: ["8字节", "4字节"], correctAnswer: "8字节" },
      { question: "未初始化的指针叫？", type: "multiple-choice", options: ["野指针", "空指针"], correctAnswer: "野指针" },
      { question: "可以通过指针修改原变量吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" }
    ]
  },
  'mem_ref': {
    title: "影子朋友",
    storyContext: "给变量起个外号，它是本体的影子。",
    lessonContent: "引用 `int& b = a;`\n`b` 就是 `a`，动了 `b` 也就动了 `a`。",
    hint: "定义引用时必须初始化！",
    challenges: [
       { question: "定义引用", type: "code-fix", codeSnippet: `int& b;`, correctAnswer: `int& b = a;` },
       { question: "引用占用额外内存吗？", type: "multiple-choice", options: ["通常不占", "占"], correctAnswer: "通常不占" },
       { question: "引用能改变指向吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" }
    ]
  },
  'mem_ref_quiz': {
    title: "练习:Ref",
    storyContext: "训练场：分身乏术。",
    lessonContent: "引用细节。",
    hint: "引用不能为 null。",
    challenges: [
      { question: "函数参数用引用是为了？", type: "multiple-choice", options: ["避免拷贝/修改原值", "好看"], correctAnswer: "避免拷贝/修改原值" },
      { question: "const 引用能修改值吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
      { question: "有没有空引用？", type: "multiple-choice", options: ["没有", "有"], correctAnswer: "没有" },
      { question: "修复错误：", type: "code-fix", codeSnippet: `int& r = 10;`, correctAnswer: `const int& r = 10;` }
    ]
  },
  'mem_dyn': {
    title: "魔法帐篷",
    storyContext: "有时候我们需要临时搭建帐篷，用完了要拆掉。",
    lessonContent: "`new` 申请内存（搭帐篷）。\n`delete` 释放内存（拆帐篷）。",
    hint: "不拆帐篷会垃圾成山（内存泄漏）！",
    challenges: [
       { question: "申请一个整数", type: "code-fix", codeSnippet: `int p = new int;`, correctAnswer: `int* p = new int;` },
       { question: "释放内存用？", type: "multiple-choice", options: ["delete", "free"], correctAnswer: "delete" },
       { question: "释放数组用？", type: "code-fix", codeSnippet: `delete arr;`, correctAnswer: `delete[] arr;` }
    ]
  },
  'mem_dyn_quiz': {
    title: "练习:Dyn",
    storyContext: "训练场：露营地。",
    lessonContent: "堆内存管理。",
    hint: "new 对应 delete。",
    challenges: [
      { question: "内存泄漏是指？", type: "multiple-choice", options: ["忘了delete", "内存太小"], correctAnswer: "忘了delete" },
      { question: "new 出来的内存在哪里？", type: "multiple-choice", options: ["堆(Heap)", "栈(Stack)"], correctAnswer: "堆(Heap)" },
      { question: "delete 后指针还需要置空吗？", type: "multiple-choice", options: ["建议置空(nullptr)", "不需要"], correctAnswer: "建议置空(nullptr)" },
      { question: "new 失败会抛出什么？", type: "multiple-choice", options: ["bad_alloc", "null"], correctAnswer: "bad_alloc" }
    ]
  },
  'data_struct': {
    title: "魔法背包",
    storyContext: "把地图、指南针、水壶都装进一个背包里。",
    lessonContent: "结构体 `struct`：把不同类型的数据打包。",
    hint: "分号！分号！",
    challenges: [
       { question: "定义结构体 Point", type: "code-fix", codeSnippet: `struct Point { int x; int y; }`, correctAnswer: `struct Point { int x; int y; };` },
       { question: "访问成员用？", type: "multiple-choice", options: [".", "->"], correctAnswer: "." },
       { question: "结构体默认权限是？", type: "multiple-choice", options: ["public", "private"], correctAnswer: "public" },
       { question: "【角度：嵌套】struct 里可以放 struct 吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
       { question: "【角度：指针】`Point* p` 访问 x 应该用？", type: "multiple-choice", options: ["p->x", "p.x"], correctAnswer: "p->x" },
       { question: "【角度：函数】struct 可以作为函数参数吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
       { question: "修复嵌套定义错误：", type: "code-fix", codeSnippet: `struct Box { Item i; };`, correctAnswer: `struct Box { struct Item i; };` }, // simplified
       { question: "定义一个包含两个 Point 的 Rect 结构体", type: "code-fix", codeSnippet: `struct Rect { Point p1, p2; };`, correctAnswer: `struct Rect { Point p1, p2; };` }
    ]
  },
  'data_struct_quiz': {
    title: "练习:Struct",
    storyContext: "训练场：打包行李。",
    lessonContent: "结构体练习。",
    hint: "指针访问成员用 ->",
    challenges: [
      { question: "初始化结构体", type: "code-fix", codeSnippet: `Point p = (1, 2);`, correctAnswer: `Point p = {1, 2};` },
      { question: "结构体大小等于所有成员大小之和吗？", type: "multiple-choice", options: ["不一定(内存对齐)", "一定"], correctAnswer: "不一定(内存对齐)" },
      { question: "指针访问结构体成员：", type: "code-fix", codeSnippet: `p.x`, correctAnswer: `p->x` },
      { question: "结构体可以包含函数吗(C++)？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
      { question: "函数参数 `void f(Point p)` 是拷贝吗？", type: "multiple-choice", options: ["是", "否(引用)"], correctAnswer: "是" },
      { question: "为了避免拷贝，参数应该怎么写？", type: "code-fix", codeSnippet: `void f(Point p)`, correctAnswer: `void f(const Point& p)` },
      { question: "结构体嵌套自己(指针)是允许的吗？(如链表)", type: "multiple-choice", options: ["允许", "不允许"], correctAnswer: "允许" },
      { question: "访问嵌套成员：rect.p1.x", type: "code-fix", codeSnippet: `rect->p1->x`, correctAnswer: `rect.p1.x` }
    ]
  },
  'data_vector': {
    title: "伸缩口袋",
    storyContext: "Vector 就像机器猫的口袋，想装多少就装多少！",
    lessonContent: "`#include <vector>`\n`vector<int> v;`\n`v.push_back(10);` 往里塞东西。",
    hint: "它是动态数组。",
    challenges: [
       { question: "引入 vector 库", type: "code-fix", codeSnippet: `#include <array>`, correctAnswer: `#include <vector>` },
       { question: "添加元素用什么函数？", type: "multiple-choice", options: ["push_back", "add", "insert"], correctAnswer: "push_back" },
       { question: "获取大小用？", type: "multiple-choice", options: ["size()", "length()"], correctAnswer: "size()" }
    ]
  },
  'data_vector_quiz': {
    title: "练习:口袋",
    storyContext: "训练场：整理仓库。",
    lessonContent: "Vector 进阶。",
    hint: "at() 比 [] 安全。",
    challenges: [
       { question: "vector 能存不同类型的数据吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
       { question: "访问元素最安全的方法？", type: "multiple-choice", options: ["at(i)", "[i]"], correctAnswer: "at(i)" },
       { question: "vector 为空时 empty() 返回？", type: "multiple-choice", options: ["true", "false"], correctAnswer: "true" },
       { question: "遍历 vector 推荐用？", type: "multiple-choice", options: ["迭代器/范围for", "while"], correctAnswer: "迭代器/范围for" }
    ]
  },

  // BOSS EXAM 4: PEAKS
  'peaks_exam': {
    title: "【BOSS】数据试炼",
    storyContext: "指针山的风暴越来越猛烈，只有掌握内存奥秘的人才能生存。",
    lessonContent: "数据与内存综合测试。",
    hint: "小心野指针和越界。",
    challenges: [
      { question: "1. 综合：`int* p;` p 是什么？", type: "multiple-choice", options: ["野指针(随机值)", "空指针"], correctAnswer: "野指针(随机值)" },
      { question: "2. 综合：数组名是指针吗？", type: "multiple-choice", options: ["是(退化)", "不是"], correctAnswer: "是(退化)" },
      { question: "3. 综合：`&x` 是什么操作？", type: "multiple-choice", options: ["取地址", "引用"], correctAnswer: "取地址" },
      { question: "4. 综合：`new` 出来的内存在哪里？", type: "multiple-choice", options: ["堆 (Heap)", "栈 (Stack)"], correctAnswer: "堆 (Heap)" },
      { question: "5. 综合：`string` 末尾有 `\\0` 吗？", type: "multiple-choice", options: ["C++ string 隐藏管理", "必须手动加"], correctAnswer: "C++ string 隐藏管理" },
      { question: "6. 综合：访问结构体指针成员用？", type: "multiple-choice", options: ["->", "."], correctAnswer: "->" },
      { question: "7. 综合：引用初始化后能改指向吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
      { question: "8. 综合：`delete` 空指针安全吗？", type: "multiple-choice", options: ["安全(无事发生)", "报错"], correctAnswer: "安全(无事发生)" }
    ]
  },

  // ==========================================
  // Region 5: Void (OOP) - 梦幻造物岛
  // ==========================================
  'oop_struct': {
    title: "积木城堡",
    storyContext: "结构体不仅能装数据，还能装功能（函数）。",
    lessonContent: "C++ 的 struct 和 class 其实很像！\n区别在于默认是公开还是私有。",
    hint: "struct 默认 public。",
    challenges: [
       { question: "struct 默认访问权限？", type: "multiple-choice", options: ["public", "private"], correctAnswer: "public" },
       { question: "class 默认访问权限？", type: "multiple-choice", options: ["private", "public"], correctAnswer: "private" },
       { question: "struct 能继承吗？", type: "multiple-choice", options: ["能", "不能"], correctAnswer: "能" }
    ]
  },
  'oop_struct_quiz': {
    title: "练习:Struct",
    storyContext: "训练场：建筑师。",
    lessonContent: "Struct vs Class。",
    hint: "...",
    challenges: [
      { question: "推荐用 struct 做什么？", type: "multiple-choice", options: ["纯数据容器 (POD)", "复杂对象"], correctAnswer: "纯数据容器 (POD)" },
      { question: "struct 可以有构造函数吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
      { question: "struct 可以有 private 成员吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
      { question: "typedef struct 在 C++ 中必须吗？", type: "multiple-choice", options: ["不必须", "必须"], correctAnswer: "不必须" }
    ]
  },
  'oop_class': {
    title: "赋予生命",
    storyContext: "类 (Class) 是图纸，对象 (Object) 是造出来的生命。",
    lessonContent: "`class` 封装了属性（数据）和行为（函数）。\n`private` 是小秘密，`public` 是给大家看的。",
    hint: "封装是 OOP 第一大特性。",
    challenges: [
       { question: "定义一个类", type: "code-fix", codeSnippet: `class Cat { };`, correctAnswer: `class Cat { };` },
       { question: "私有成员外部能访问吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
       { question: "实例化对象：", type: "code-fix", codeSnippet: `Cat c = new Cat();`, correctAnswer: `Cat c;` }
    ]
  },
  'oop_class_quiz': {
    title: "练习:Class",
    storyContext: "训练场：造物主。",
    lessonContent: "封装练习。",
    hint: "Getter/Setter。",
    challenges: [
      { question: "保护成员 `protected` 谁能访问？", type: "multiple-choice", options: ["子类和自己", "任何人"], correctAnswer: "子类和自己" },
      { question: "如何修改私有成员？", type: "multiple-choice", options: ["通过公有函数(Setter)", "直接修改"], correctAnswer: "通过公有函数(Setter)" },
      { question: "类的分号不能忘！", type: "code-fix", codeSnippet: `class A {}`, correctAnswer: `class A {};` },
      { question: "this 指针指向什么？", type: "multiple-choice", options: ["当前对象", "类"], correctAnswer: "当前对象" }
    ]
  },
  'oop_ctor': {
    title: "诞生祝福",
    storyContext: "对象出生时（创建），会自动执行的魔法。",
    lessonContent: "构造函数 `ClassName()`。\n没有返回值，名字和类名一样。",
    hint: "初始化列表更高一筹。",
    challenges: [
       { question: "定义构造函数", type: "code-fix", codeSnippet: `void Cat() {}`, correctAnswer: `Cat() {}` },
       { question: "构造函数可以重载吗？", type: "multiple-choice", options: ["可以", "不可以"], correctAnswer: "可以" },
       { question: "析构函数前面有什么符号？", type: "multiple-choice", options: ["~", "!"], correctAnswer: "~" }
    ]
  },
  'oop_ctor_quiz': {
    title: "练习:Ctor",
    storyContext: "训练场：生命周期。",
    lessonContent: "构造与析构。",
    hint: "RAII。",
    challenges: [
      { question: "对象销毁时自动调用？", type: "multiple-choice", options: ["析构函数", "构造函数"], correctAnswer: "析构函数" },
      { question: "默认构造函数是无参的吗？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" },
      { question: "初始化列表写在哪里？", type: "code-fix", codeSnippet: `Cat() : age(1) {}`, correctAnswer: `Cat() : age(1) {}` },
      { question: "拷贝构造函数的参数是？", type: "multiple-choice", options: ["const引用", "值"], correctAnswer: "const引用" }
    ]
  },
  'oop_inher': {
    title: "家族魔法",
    storyContext: "龙宝宝继承了龙妈妈的飞行能力。",
    lessonContent: "继承 `class Dog : public Animal`。\n子类拥有父类的公有魔法。",
    hint: "冒号 : 表示继承。",
    challenges: [
       { question: "定义子类", type: "code-fix", codeSnippet: `class Dog extends Animal`, correctAnswer: `class Dog : public Animal` },
       { question: "私有继承是默认的吗(class)？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" },
       { question: "子类能继承父类的构造函数吗？", type: "multiple-choice", options: ["C++11前不能", "能"], correctAnswer: "C++11前不能" }
    ]
  },
  'oop_inher_quiz': {
    title: "练习:Inher",
    storyContext: "训练场：家族树。",
    lessonContent: "继承进阶。",
    hint: "构造顺序：父->子。",
    challenges: [
      { question: "构造函数调用顺序？", type: "multiple-choice", options: ["父类->子类", "子类->父类"], correctAnswer: "父类->子类" },
      { question: "析构函数调用顺序？", type: "multiple-choice", options: ["子类->父类", "父类->子类"], correctAnswer: "子类->父类" },
      { question: "基类指针能指向子类对象吗？", type: "multiple-choice", options: ["能", "不能"], correctAnswer: "能" },
      { question: "多继承是 C++ 的特性吗？", type: "multiple-choice", options: ["是", "否"], correctAnswer: "是" }
    ]
  },
  'oop_poly': {
    title: "千变万化",
    storyContext: "同一个口令 `speak()`，猫咪是喵喵，小狗是汪汪。",
    lessonContent: "多态：`virtual` 虚函数。\n父类指针调用虚函数，会执行子类的版本。",
    hint: "必须有 virtual 关键字。",
    challenges: [
       { question: "定义虚函数", type: "code-fix", codeSnippet: `void speak() {}`, correctAnswer: `virtual void speak() {}` },
       { question: "纯虚函数怎么写？", type: "code-fix", codeSnippet: `virtual void f() = 0;`, correctAnswer: `virtual void f() = 0;` },
       { question: "含有纯虚函数的类叫？", type: "multiple-choice", options: ["抽象类", "虚类"], correctAnswer: "抽象类" }
    ]
  },
  'oop_poly_quiz': {
    title: "练习:Poly",
    storyContext: "训练场：幻影迷宫。",
    lessonContent: "多态与虚表。",
    hint: "Override。",
    challenges: [
      { question: "override 关键字的作用？", type: "multiple-choice", options: ["检查虚函数重写", "强制重写"], correctAnswer: "检查虚函数重写" },
      { question: "构造函数可以是虚函数吗？", type: "multiple-choice", options: ["不可以", "可以"], correctAnswer: "不可以" },
      { question: "析构函数建议是虚函数吗？", type: "multiple-choice", options: ["建议(防止泄漏)", "不建议"], correctAnswer: "建议(防止泄漏)" },
      { question: "多态是在编译时还是运行时决定的？", type: "multiple-choice", options: ["运行时(动态绑定)", "编译时"], correctAnswer: "运行时(动态绑定)" }
    ]
  },
  'oop_static': {
    title: "公会契约",
    storyContext: "所有成员共享同一个魔法池，一人存入，大家都能看到。",
    lessonContent: "Static 成员属于类，不属于对象。\n`static int count;`\n`ClassName::count` 访问。",
    hint: "它是共享的。",
    challenges: [
       { question: "定义静态成员", type: "code-fix", codeSnippet: `static int count;`, correctAnswer: `static int count;` },
       { question: "静态函数能访问非静态成员吗？", type: "multiple-choice", options: ["不能(没有this)", "能"], correctAnswer: "不能(没有this)" },
       { question: "静态成员变量需要在类外定义吗？", type: "multiple-choice", options: ["需要", "不需要"], correctAnswer: "需要" }
    ]
  },
  'oop_static_quiz': {
    title: "练习:契约",
    storyContext: "训练场：共享中心。",
    lessonContent: "Static 细节。",
    hint: "类名::访问。",
    challenges: [
       { question: "this 指针存在于静态函数中吗？", type: "multiple-choice", options: ["不存在", "存在"], correctAnswer: "不存在" },
       { question: "静态成员计算 sizeof 时算在对象大小里吗？", type: "multiple-choice", options: ["不算", "算"], correctAnswer: "不算" },
       { question: "可以有静态构造函数吗(C++)？", type: "multiple-choice", options: ["不可以", "可以"], correctAnswer: "不可以" }
    ]
  },

  // BOSS EXAM 5: VOID
  'void_exam': {
    title: "【BOSS】造物主试炼",
    storyContext: "你已经站在了魔法之巅。造物主向你发出了最后的挑战！",
    lessonContent: "OOP 综合测试。",
    hint: "核心思想：封装、继承、多态。",
    challenges: [
      { question: "1. 综合：OOP 三大特性不包括？", type: "multiple-choice", options: ["递归", "封装", "继承", "多态"], correctAnswer: "递归" },
      { question: "2. 综合：默认访问权限 class 是？", type: "multiple-choice", options: ["private", "public"], correctAnswer: "private" },
      { question: "3. 综合：`virtual` 关键字作用？", type: "multiple-choice", options: ["开启多态", "虚拟内存"], correctAnswer: "开启多态" },
      { question: "4. 综合：纯虚函数写法？", type: "code-fix", codeSnippet: `virtual void f() {}`, correctAnswer: `virtual void f() = 0;` },
      { question: "5. 综合：构造函数顺序？", type: "multiple-choice", options: ["基类->成员->子类", "子类->基类"], correctAnswer: "基类->成员->子类" },
      { question: "6. 综合：析构函数顺序？", type: "multiple-choice", options: ["相反(子->成员->基)", "相同"], correctAnswer: "相反(子->成员->基)" },
      { question: "7. 综合：`protected` 谁能访问？", type: "multiple-choice", options: ["子类和自己", "任何人"], correctAnswer: "子类和自己" },
      { question: "8. 综合：抽象类能实例化吗？", type: "multiple-choice", options: ["不能", "能"], correctAnswer: "不能" },
      { question: "9. 综合：菱形继承用什么解决？", type: "multiple-choice", options: ["虚继承(virtual inheritance)", "多重继承"], correctAnswer: "虚继承(virtual inheritance)" },
      { question: "10. 综合：`final` 关键字作用？", type: "multiple-choice", options: ["禁止继承/重写", "结束程序"], correctAnswer: "禁止继承/重写" }
    ]
  }
};
